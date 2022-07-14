/** @param {NS} ns */
export async function main(ns, target) {
    target = ns.args[0]
    return await ns.hack(target);
};