/** @param {NS} ns */
export async function main(ns, target) {
    target = ns.args[0]
    let retrieved = await ns.hack(target, 1)
    return retrieved;
};