export function replaceDangerSymbol(input) {
    return input.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
