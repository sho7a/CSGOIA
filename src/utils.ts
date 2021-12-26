import { BAYONET, BOWIE, BUTTERFLY, CLASSIC, FALCHION, FLIP, GLOCK, GUT, HUNTSMAN, KARAMBIT, M9, NAVAJA, NOMAD, PARACORD, PHASES, SHADOWS, SKELETON, STILETTO, SURVIVAL, TALON, URSUS } from "./definitions";

export function getPhase(item_name, paintindex) {
  if (item_name !== "Doppler" && item_name !== "Gamma Doppler") return "";
  return " (" + PHASES[paintindex] + ")";
}

export function getFade(item_name, weapon_type, paintseed) {
  if (item_name !== "Fade") return "";
  let fade: number;
  switch (weapon_type) {
    case "Karambit": fade = KARAMBIT[paintseed]; break;
    case "Talon Knife": fade = TALON[paintseed]; break;
    case "Classic Knife": fade = CLASSIC[paintseed]; break;
    case "Skeleton Knife": fade = SKELETON[paintseed]; break;
    case "Nomad Knife": fade = NOMAD[paintseed]; break;
    case "Survival Knife": fade = SURVIVAL[paintseed]; break;
    case "Paracord Knife": fade = PARACORD[paintseed]; break;
    case "Stiletto Knife": fade = STILETTO[paintseed]; break;
    case "Navaja Knife": fade = NAVAJA[paintseed]; break;
    case "Ursus Knife": fade = URSUS[paintseed]; break;
    case "Butterfly Knife": fade = BUTTERFLY[paintseed]; break;
    case "M9 Bayonet": fade = M9[paintseed]; break;
    case "Bayonet": fade = BAYONET[paintseed]; break;
    case "Huntsman Knife": fade = HUNTSMAN[paintseed]; break;
    case "Flip Knife": fade = FLIP[paintseed]; break;
    case "Bowie Knife": fade = BOWIE[paintseed]; break;
    case "Shadow Daggers": fade = SHADOWS[paintseed]; break;
    case "Gut Knife": fade = GUT[paintseed]; break;
    case "Falchion Knife": fade = FALCHION[paintseed]; break;
    case "Glock-18": fade = GLOCK[paintseed]; break;
  }
  return fade === undefined ? "" : " (" + fade + "%)";
}