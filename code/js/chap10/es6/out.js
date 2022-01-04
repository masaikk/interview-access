export const PI = Math.PI;

//直接导出，通过export关键字
export class Circle {
    constructor(r) {
        this.r = r;
    }

    area() {
        return PI * this.r * this.r;
    }
}