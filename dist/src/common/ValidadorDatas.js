"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidadorData {
    constructor() {
        this.validarData = (data) => {
            let mascara = /^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/;
            if (!mascara.test(data)) {
                return false;
            }
            return true;
        };
    }
}
exports.ValidadorData = ValidadorData;
//# sourceMappingURL=ValidadorDatas.js.map