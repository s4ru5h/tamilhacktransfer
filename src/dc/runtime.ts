import { useEffect, useReducer, useRef } from "react";

/**
 * A tiny stand-in for the design canvas runtime, so each board's logic class runs unchanged:
 * `this.props`, `this.state` and `this.setState()` behave as they did on the canvas.
 */
export class DCLogic {
  props: Record<string, any> = {};
  state: Record<string, any> | null = null;
  setState(_patch: Record<string, any> | ((s: any, p: any) => Record<string, any>)) {}
  forceUpdate() {}
}

export function useDCLogic(Cls: new () => any, defaults: Record<string, any>) {
  const [, force] = useReducer((x: number) => x + 1, 0);
  const ref = useRef<any>(null);
  if (!ref.current) {
    const inst = new Cls();
    inst.props = { ...defaults };
    inst.state = null;
    inst.setState = (patch: any) => {
      const p = typeof patch === "function" ? patch(inst.state, inst.props) : patch;
      inst.state = { ...(inst.state || {}), ...p };
      force();
    };
    inst.forceUpdate = () => force();
    ref.current = inst;
  }
  useEffect(() => {
    const inst = ref.current;
    inst.componentDidMount?.();
    return () => inst.componentWillUnmount?.();
  }, []);
  return ref.current.renderVals();
}
