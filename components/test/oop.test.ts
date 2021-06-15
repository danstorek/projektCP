describe('OOP TEST', () => {
    it('No name person', () => {
        expect(4).toBe(4);
    });
})

describe('Person fullname test', () => {
    it('Example', () => {
        var example = new Person("First", "Last")
        expect(example.FullName).toBe("First Last");
    });
})

export class Person {
    private firstName: string | undefined = 'noname'
    private lastName: string | undefined = 'noname'

    constructor(firstName?: string, lastName?: string) {
        if (lastName) this.lastName = lastName
        if (firstName) this.firstName = firstName
    }

    pozdrav(): void {
        console.log("Ahoj " + this.firstName + " " + this.lastName);
    }

    get FullName() {
        return this.firstName + " " + this.lastName
    }
}

export class Employee extends Person {
    #id: number

    constructor(firstName: string, lastName: string, id: number) {
        super(firstName, lastName);
        this.#id = id
    }

    get IdFullName() {
        return this.#id + " " + super.FullName;
    }

}

export { }