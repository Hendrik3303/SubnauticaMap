// Data file for all the markers
const mapData = {
    wracks: [
        { id: "1", name: "Wrack in den Grassy Plateaus", coords: [-300, 150], info: "Enthält Laserschneider-Fragmente" },
        { id: "2", name: "Wrack in den Blood Kelp Caves", coords: [-600, 400], info: "Vorsicht: Crab-Squids!" }
    ],
    blueprints: [
        { id: "101", name: "Seaglide Fragment", coords: [-100, 50], info: "Im flachen Wasser zu finden" }
    ],
    lifepods: [ //here we define all the lifepod datas
        { id: "lp5", image: "images/lifepod5.jpg", name: "Lifepod 5 (Spawn)", coords: [0, 0], coordsinfo: "X:?,Y:2,Z:?" ,info: "Lifepod 5 will spawn randomly somewhere in the Safe Shallows, so this pin dosn't really matter" },
        { id: "lp6", image: "images/lifepod6.jpg", name: "Lifepod 6", coords: [364, 310], coordsinfo: "X:364,Y:-113,Z:310", info: "You will find lifepod 6 at this location"},
        { id: "lp3", image: "images/lifepod3.jpg", name: "Lifepod 3", coords: [-33, 410], coordsinfo: "X:-33,Y:-20,Z:410", info: "You will find lifepod 3 at this location"},
    ],
    pda:[
        {id: "pda1"}
    ]
};

//Lifepot 5 is at 24, 2, 284
//lifepot 6 is at 364 -113 310 and ultra glide fins inside and also crew log 2 inside and #1 outside
//lifepor 3 is at -33 -20 410