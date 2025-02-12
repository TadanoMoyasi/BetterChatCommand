let joinFloor = null;
let nowFloor = null;
let nowTier = null;

export function getJoinFloor() { return joinFloor };
export function getNowFloor() { return nowFloor };
export function getNowTier() { return nowTier };

register("chat", (mode, floor) => {
    if (mode === "MM") {
        switch (floor) {
            case "I":
                joinFloor = "master_catacombs_floor_one";
                nowFloor = "M1";
                break;
            case "II":
                joinFloor = "master_catacombs_floor_two";
                nowFloor = "M2";
                break;
            case "III":
                joinFloor = "master_catacombs_floor_three";
                nowFloor = "M3";
                break;
            case "IV":
                joinFloor = "master_catacombs_floor_four";
                nowFloor = "M4";
                break;
            case "V":
                joinFloor = "master_catacombs_floor_five";
                nowFloor = "M5";
                break;
            case "VI":
                joinFloor = "master_catacombs_floor_six";
                nowFloor = "M6";
                break;
            case "VII":
                joinFloor = "master_catacombs_floor_seven";
                nowFloor = "M7";
                break;
        }
    } else {
        switch (floor) {
            case "Entrance":
                joinFloor = "catacombs_entrance";
                nowFloor = "Entrance";
                break;
            case "Floor I":
                joinFloor = "catacombs_floor_one";
                nowFloor = "F1";
                break;
            case "Floor II":
                joinFloor = "catacombs_floor_two";
                nowFloor = "F2";
                break;
            case "Floor III":
                joinFloor = "catacombs_floor_three";
                nowFloor = "F3";
                break;
            case "Floor IV":
                joinFloor = "catacombs_floor_four";
                nowFloor = "F4";
                break;
            case "Floor V":
                joinFloor = "catacombs_floor_five";
                nowFloor = "F5";
                break;
            case "Floor VI":
                joinFloor = "catacombs_floor_six";
                nowFloor = "F6";
                break;
            case "Floor VII":
                joinFloor = "catacombs_floor_seven";
                nowFloor = "F7";
                break;
        }
    }
}).setCriteria(/(?:\[.+\] )?\w+ entered ?(MM)? The Catacombs, Floor (.+)!/).setContains();

register("chat", (tier) => {
    switch (tier) {
        case "Basic":
            joinFloor = "kuudra_normal";
            nowTier = "Basic";
            break;
        case "Hot":
            joinFloor = "kuudra_hot";
            nowTier = "Hot";
            break;
        case "Burning":
            joinFloor = "kuudra_burning";
            nowTier = "Burning";
            break;
        case "Fiery":
            joinFloor = "kuudra_fiery";
            nowTier = "Fiery";
            break;
        case "Infernal":
            joinFloor = "kuudra_infernal";
            nowTier = "Infernal";
            break;
    }
}).setCriteria(/(?:\[.+\] )?\w+ entered Kuudra's Hollow, (.+) Tier!/).setContains();

/*&9&m-----------------------------
& r & b[MVP & r & 4 +& r & b] TdMy & r & f & r & eentered & r & aThe Catacombs & r & e, & r & eFloor I & r & e!
& r & 9 & m-----------------------------& r*/