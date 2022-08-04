/** @param {NS} ns */
export async function main(ns) {
	while (true) {
		var servername = ns.getHostname();
		var connectedservers = ns.scan();
		for (let i = 0; i < connectedservers.length; i++) {
			if (ns.getServerNumPortsRequired(connectedservers.at(i)) <= 1) {
				let target = connectedservers.at(i);
				ns.print("Target is " + target);
				let skillgap = ns.getServerRequiredHackingLevel(target) - ns.getHackingLevel() > 0;
				if (skillgap > 0) {
					ns.print('Skill gap is too high: ' + skillgap)
				} else {
					if (ns.hasRootAccess(target) == true) {
						ns.print('Having root');
					} else {
						ns.print('No Root');
						await ns.nuke(target);
						ns.print('Nuked');
					};
					let sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					ns.print("security difference is " + sec);
					while (sec > 0) {
						ns.print('weakening')
						await ns.weaken(target);
						sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					};
					let growth_perc = (1-(ns.getServerMoneyAvailable(target)/ns.getServerMaxMoney(target)));
					ns.print(ns.getServerMoneyAvailable(target) / ns.getServerMaxMoney(target));
					ns.print('room for growth is ' + growth_perc);
					while (growth_perc > 0.25) {
						ns.print('Growing');
						await ns.grow(target);
						growth_perc = (1-(ns.getServerMoneyAvailable(target)/ns.getServerMaxMoney(target)));
						ns.print('New room for growth is' + growth_perc);
					};
					sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					ns.print("security difference is " + sec);
					while (sec > 0) {
						ns.print('weakening')
						await ns.weaken(target);
						sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					};
					ns.print('hacking')
					await ns.nuke(target);
					let earned = await ns.hack(target);
					ns.print('Cashed out ' + earned);
					}
				}
			};
			};
		};