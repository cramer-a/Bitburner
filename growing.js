/** @param {NS} ns */
export async function main(ns, target) {
    target = ns.args[0]
    var growth = ns.getServerMoneyAvailable(target) / ns.getServerMaxMoney(target);
    ns.tprint('Room for growth is ' + growth);
    while (growth > 0.25) {
        ns.tprint('growing');
        let threading = ((ns.getServerMaxRam(target)-ns.getServerUsedRam(target))/ ns.getScriptRam('ns.grow'));
        ns.tprint('Running ns.grow with ' + threading + 'threads on ' + target);
        await ns.grow(target, { threads: ns.Math.floor(threading) });
        growth = ns.getServerMoneyAvailable(target) / ns.getServerMaxMoney(target);
    };
};