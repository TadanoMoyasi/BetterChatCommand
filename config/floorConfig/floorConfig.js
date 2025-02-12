import {
    @ButtonProperty,
    @CheckboxProperty,
    Color,
    @ColorProperty,
    @PercentSliderProperty,
    @SelectorProperty,
    @SwitchProperty,
    @TextProperty,
    @Vigilant,
    @SliderProperty
} from 'Vigilance';

@Vigilant("BetterChatCommand/floorconfig", "§f§lBetterChatCommand", {
    getCategoryComparator: () => (a, b) => {
        const categories = ["Catacombs", "Master", "Kuudra"];
        return categories.indexOf(a.name) - categories.indexOf(b.name);
    }
})
class PartyFloorSettings {
    constructor() {
        this.initialize(this);
        this.setCategoryDescription("Catacombs", "§f§l<BetterChatCommand CatacombsFloor Settings>");
        this.setCategoryDescription("Master", "§f§l<BetterChatCommand MasterFloor Settings>");
        this.setCategoryDescription("Kuudra", "§f§l<BetterChatCommand KuudraTier Settings>");
    }

    @CheckboxProperty({
        name: "Entrance",
        description: "Enter Entrance with !f0",
        category: "Catacombs"
    })
    PartyEntrance = true;

    @CheckboxProperty({
        name: "F1",
        description: "Enter F1 with !f1",
        category: "Catacombs"
    })
    PartyF1 = true;

    @CheckboxProperty({
        name: "F2",
        description: "Enter F2 with !f2",
        category: "Catacombs"
    })
    PartyF2 = true;

    @CheckboxProperty({
        name: "F3",
        description: "Enter F3 with !f3",
        category: "Catacombs"
    })
    PartyF3 = true;

    @CheckboxProperty({
        name: "F4",
        description: "Enter F4 with !f4",
        category: "Catacombs"
    })
    PartyF4 = true;

    @CheckboxProperty({
        name: "F5",
        description: "Enter F5 with !f5",
        category: "Catacombs"
    })
    PartyF5 = true;

    @CheckboxProperty({
        name: "F6",
        description: "Enter F6 with !f6",
        category: "Catacombs"
    })
    PartyF6 = true;

    @CheckboxProperty({
        name: "F7",
        description: "Enter F7 with !f7",
        category: "Catacombs"
    })
    PartyF7 = true;

    @CheckboxProperty({
        name: "M1",
        description: "Enter M1 with !m1",
        category: "Master"
    })
    PartyM1 = true;

    @CheckboxProperty({
        name: "M2",
        description: "Enter M2 with !m2",
        category: "Master"
    })
    PartyM2 = true;

    @CheckboxProperty({
        name: "M3",
        description: "Enter M3 with !m3",
        category: "Master"
    })
    PartyM3 = true;

    @CheckboxProperty({
        name: "M4",
        description: "Enter M4 with !m4",
        category: "Master"
    })
    PartyM4 = true;

    @CheckboxProperty({
        name: "M5",
        description: "Enter M5 with !m5",
        category: "Master"
    })
    PartyM5 = true;

    @CheckboxProperty({
        name: "M6",
        description: "Enter M6 with !m6",
        category: "Master"
    })
    PartyM6 = true;

    @CheckboxProperty({
        name: "M7",
        description: "Enter M7 with !m7",
        category: "Master"
    })
    PartyM7 = true;

    @CheckboxProperty({
        name: "Basic",
        description: "Enter Basic with !t1",
        category: "Kuudra"
    })
    PartyT1 = true;

    @CheckboxProperty({
        name: "Hot",
        description: "Enter Hot with !t2",
        category: "Kuudra"
    })
    PartyT2 = true;

    @CheckboxProperty({
        name: "Burning",
        description: "Enter Burning with !t3",
        category: "Kuudra"
    })
    PartyT3 = true;

    @CheckboxProperty({
        name: "Fiery",
        description: "Enter Fiery with !t4",
        category: "Kuudra"
    })
    PartyT4 = true;

    @CheckboxProperty({
        name: "Infernal",
        description: "Enter Infernal with !t5",
        category: "Kuudra"
    })
    PartyT5 = true;

}
export default new PartyFloorSettings();