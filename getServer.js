/** @param {NS} ns */
export async function main(ns) {
    let avail_money = ns.getPlayer().money
    let ramtobuy = 0
    let scripts = ['basic_farming_weaken.js', 'growing.js', 'hacking.js', 'weakening.js']
    for (let i = 8; i < 20; i++) {
        let ram = Math.pow(2, i)
        if (ns.getPurchasedServerCost(ram) < avail_money) {
            ramtobuy = ram
        }
        else {break}        
    }
    ns.purchaseServer('HAL', ramtobuy);
    await ns.scp(scripts, 'HAL');
    ns.exec('basic_farming_weaken.js', 'HAL');
};