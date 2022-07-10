/** @param {NS} ns */
export async function main(ns) 
{
	while (true) {
		var servername = ns.getHostname();
		var connectedservers = ns.scan();
		for (let i = 0; i < connectedservers.length; i++) {
			if (ns.getServerNumPortsRequired(connectedservers.at(i)) <= 1) {
				let target = connectedservers.at(i);
				ns.tprint('Target is ' + target);
				let skillgap = ns.getServerRequiredHackingLevel(target) - ns.getHackingLevel() > 0;
				if (skillgap > 0) {
					ns.tprint('Skill gap is too high: ' + skillgap)
				} else {
					if (ns.hasRootAccess(target) == true) {
						ns.tprint('Having root');
					} else {
						ns.tprint('No Root');
						await ns.nuke(target);
						ns.tprint('Nuked');
					};
					let sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					ns.tprint('security difference is ' + sec);
					if (sec > 0) {
						ns.tprint('weakening needed');
						await weakening(target);
					} else {ns.tprint('no weakening needed')};
					let growth_perc = (1-(ns.getServerMoneyAvailable(target)/ns.getServerMaxMoney(target)));
					ns.tprint(ns.getServerMoneyAvailable(target) / ns.getServerMaxMoney(target));
					ns.tprint('room for growth is ' + growth_perc);
					while (growth_perc > 0.25) {
						ns.tprint('Growing');
						await ns.grow(target);
					};
					//let threading1 = ((ns.getServerMaxRam(target)-ns.getServerUsedRam(target)) / ns.getScriptRam('ns.weaken'))
					//ns.tprint(threading1);
					//ns.tprint('Peter');
					//let sec = ns.getServerSecurityLevel(target) - ns.getServerSecurityLevel(target);
					//ns.tprint("security difference is " + sec);
					//while (sec > 0) {
					//	ns.tprint('weakening')
					//	await ns.weaken(target);
					//};
                    ns.tprint('calling with' + target);
					let sec2 = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					ns.tprint('security difference is ' + sec);
					if (sec2 > 0) {
						await weakening(target);
					} else {ns.tprint('no weakening needed')};
					ns.tprint('hacking')
					await ns.nuke(target);
					let earned = await ns.hack(target);
					ns.tprint('Cashed out ' + earned);
				}
			}
		}
	}
};

async function weakening(target) {
	//ns.tprint("Args of weakening are " + arguments[0]);
	//var target = String(arguments[0])
	ns.tprint(target);
	ns.tprint('Paul');
	let sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
	ns.tprint('security difference is ' + sec);
	while (sec > 0) {
		ns.tprint('weakening');
		ns.tprint('Piotr');
		let threading = ns.Math.floor((ns.getServerMaxRam(target)-ns.getServerUsedRam(target))/ ns.getScriptRam('ns.weaken'));
		ns.tprint(threading);
		await ns.weaken({threads : threading}, target);
		print('Security level now ' + ns.getServerSecurityLevel(target));
	}
};