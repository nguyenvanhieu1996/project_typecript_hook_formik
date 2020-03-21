export const throwError = (resp: any) => {
    if (!resp || !resp.status) {
        throw new Error("Error");
    }
}