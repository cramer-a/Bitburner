/** @param {NS} ns */
export async function main(ns, target) {
    target = ns.args[0]
    var sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
    while (sec > 0) {
        ns.tprint('weakening');
        let threading = ((ns.getServerMaxRam(target)-ns.getServerUsedRam(target))/ ns.getScriptRam('ns.weaken'));
        ns.tprint('Running ns.weaken with ' + threading + 'threads on' + target);
        await ns.weaken(target, { threads: ns.Math.floor(threading) });
        sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
    };
};