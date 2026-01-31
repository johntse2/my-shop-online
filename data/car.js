class Car {
    #brand;
    #model;
    speed;
    isTrunkOpen = false;

    constructor(carDetails) {
        this.#brand = carDetails.brand;
        this.#model = carDetails.model;
        this.speed = 0;
    }

    displayInfo() {
        const trunkStatus = this.isTrunkOpen ? "Open" : "Close";

        console.log(`${this.#brand}: ${this.#model}`);
        console.log(`${this.#brand}: ${this.#model}, speed:${this.speed}km/h`)
        console.log(`TrunkInfo: ${trunkStatus}`)
    }

    go() {
        if (!this.isTrunkOpen)
            this.speed += 5;
        if (this.speed > 200) {
            this.speed = 200;

        }
    }
    brake() {
        this.speed -= 5;

        // Limit the speed to 0.
        if (this.speed < 0) {
            this.speed = 0;

        }
    }

    openTrunk() {
        this.isTrunkOpen = true;
        this.speed = 0;

    }
    closeTrunk() {
        this.isTrunkOpen = false;
    }
}

const car1 = new Car(
    {
        brand: "Toyoto",
        model: "Corolla",
    }
)

const car2 = new Car({
    brand: "Tesla",
    model: "Model 3",
})


car1.go();
car1.go();
car1.displayInfo();

car2.go();
car2.openTrunk();
car2.go();
car2.go();
car2.displayInfo();



class RaceCar extends Car {
    acceleration = 0;

    constructor(carDetails){
     super(carDetails);
     this.acceleration = carDetails.acceleration;
    }

    go(){
        this.speed += this.acceleration;

        if (this.speed > 300) {
            this.speed = 300;
        }
    }
    openTrunk() {console.log("Race car does not have trunk");
    }

    closeTrunk() {
        console.log("Race car does not have trunk")
    }

}

const RaceCar1 = new RaceCar(  {
        brand: "McLaran",
        model: "F1",
        acceleration: 20
     
    }
);

RaceCar1.go();
RaceCar1.go();
RaceCar1.go();
RaceCar1.displayInfo();
RaceCar1.openTrunk();
RaceCar1.displayInfo();
console.log(RaceCar1);





