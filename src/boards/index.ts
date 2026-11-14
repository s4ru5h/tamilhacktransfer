import StartBoard from "@/boards/StartBoard";
import EntranceBoard from "@/boards/EntranceBoard";
import KitchenBoard from "@/boards/KitchenBoard";
import LivingRoomBoard from "@/boards/LivingRoomBoard";
import ReportBoard from "@/boards/ReportBoard";
import TownHubBoard from "@/boards/TownHubBoard";
import AirportBoard from "@/boards/AirportBoard";
import RestaurantBoard from "@/boards/RestaurantBoard";
import HomePrototypeBoard from "@/boards/HomePrototypeBoard";
import EntranceFeedbackBoard from "@/boards/EntranceFeedbackBoard";

/** Every board from the design canvas, in tour order first. */
export const BOARDS = [
  { path: "/start", title: "Front page · Paati Payanam", Component: StartBoard, selfScale: true },
  { path: "/entrance", title: "Room 1 · வாசல் entrance (playable)", Component: EntranceBoard, selfScale: true },
  { path: "/entrance-feedback", title: "End screen · Paati's feedback sheet", Component: EntranceFeedbackBoard, selfScale: true },
  { path: "/kitchen", title: "Room 2 · சமையலறை kitchen (playable)", Component: KitchenBoard, selfScale: true },
  { path: "/living-room", title: "Room 3 · ஹால் living room (playable)", Component: LivingRoomBoard, selfScale: true },
  { path: "/report-card", title: "Paati’s report card", Component: ReportBoard, selfScale: true },
  { path: "/town", title: "A · Kolam Cozy town hub", Component: TownHubBoard, selfScale: false },
  { path: "/airport", title: "B · Chennai Dusk airport taxi curb", Component: AirportBoard, selfScale: false },
  { path: "/restaurant", title: "C · Palm-Leaf 4-Tone restaurant", Component: RestaurantBoard, selfScale: false },
  { path: "/home-prototype", title: "Earlier Home scene prototype (playable)", Component: HomePrototypeBoard, selfScale: false },
];
