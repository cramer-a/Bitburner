/** @param {NS} ns */
export async function main(ns, target) {
    target = ns.args[0]
    await ns.weaken(target, 1);
};