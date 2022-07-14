/** @param {NS} ns */
export async function main(ns) {
	while (true) {
		var connectedservers = ns.scan();
		for (let i = 0; i < connectedservers.length; i++) {
			if (ns.getServerNumPortsRequired(connectedservers.at(i)) <= 1) {
				var target = connectedservers.at(i);
				ns.tprint('Target is ' + target);
				let skillgap = ns.getServerRequiredHackingLevel(target) - ns.getHackingLevel();
				if (skillgap > 0) {
					ns.tprint('Skill gap is too high: ' + skillgap)
				} else {
					if (ns.hasRootAccess(target) == true) {
						ns.tprint('Having root');
					} else {
						ns.tprint('No Root');
						ns.nuke(target);
						ns.tprint('Nuked');
					};
					var sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					ns.tprint('security difference is ' + sec);
					while (sec > 0) {
						ns.tprint('weaken')
						ns.run('weakening.js', 1, target);
    					while (ns.isRunning('weakening.js')) await ns.sleep();
						sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					};
					var growth_perc = (1-(ns.getServerMoneyAvailable(target)/ns.getServerMaxMoney(target)));;
					ns.tprint('room for growth is ' + growth_perc);
					while (growth_perc > 0.25) {
						ns.tprint('Growing');
						ns.run('growing.js', 1, target);
    					while (ns.isRunning('growing.js')) await ns.sleep();
						growth_perc = (1-(ns.getServerMoneyAvailable(target)/ns.getServerMaxMoney(target)))
					};
					sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					ns.tprint('security difference is ' + sec);
					while (sec > 0) {
						ns.tprint('weaken')
						ns.run('weakening.js', 1, target);
    					while (ns.isRunning('weakening.js')) await ns.sleep();
						sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					};
					ns.tprint('hacking ' + target);
					//await ns.nuke(target);
					let earned = await ns.hack(target);
					ns.tprint('Cashed out ' + earned);
				};
			} else {ns.tprint('Too many ports needed')};
		};
	};
};