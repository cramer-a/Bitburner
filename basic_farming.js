/** @param {NS} ns */
export async function main(ns) {
	while (true) {
		var servername = ns.getHostname();
		var connectedservers = ns.scan();
		for (let i = 0; i < connectedservers.length; i++) {
			if (ns.getServerNumPortsRequired(connectedservers.at(i)) <= 1) {
				let target = connectedservers.at(i);
				ns.tprint("Target is " + target);
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
					let growth_perc = (1-(ns.getServerMoneyAvailable(target)/ns.getServerMaxMoney(target)));
					ns.tprint(ns.getServerMoneyAvailable(target) / ns.getServerMaxMoney(target));
					ns.tprint('room for growth is ' + growth_perc);
					while (growth_perc > 0.25) {
						ns.tprint('Growing');
						await ns.grow(target);
						growth_perc = (1-(ns.getServerMoneyAvailable(target)/ns.getServerMaxMoney(target)));
						ns.tprint('New room for growth is' + growth_perc);
					};
					let sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					ns.tprint("security difference is " + sec);
					while (sec > 0) {
						ns.tprint('weakening')
						await ns.weaken(target);
						sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					};
					ns.tprint('hacking')
					await ns.nuke(target);
					let earned = await ns.hack(target);
					ns.tprint('Cashed out ' + earned);
					}
				}
			};
			};
		};