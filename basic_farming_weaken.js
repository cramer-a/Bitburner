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
						let threading = Math.floor((ns.getServerMaxRam('home')-ns.getServerUsedRam('home'))/ ns.getScriptRam('weakening.js'));
						let pid = ns.run('weakening.js', threading, target);
    					while (ns.isRunning(pid)) await ns.sleep(500);
						sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					};
					var growth_perc = (1-(ns.getServerMoneyAvailable(target)/ns.getServerMaxMoney(target)));
					ns.tprint('room for growth is ' + growth_perc);
					while (growth_perc > 0.25) {
						ns.tprint('Growing');
						let threading = ((ns.getServerMaxRam('home')-ns.getServerUsedRam('home'))/ ns.getScriptRam('growing.js'));
						let pid = ns.run('growing.js', threading, target);
    					while (ns.isRunning(pid)) await ns.sleep(500);
						growth_perc = (1-(ns.getServerMoneyAvailable(target)/ns.getServerMaxMoney(target)))
					};
					sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					ns.tprint('security difference is ' + sec);
					while (sec > 0) {
						ns.tprint('weaken')
						let threading = ((ns.getServerMaxRam('home')-ns.getServerUsedRam('home'))/ ns.getScriptRam('weakening.js'));
						let pid = ns.run('weakening.js', threading, target);
    					while (ns.isRunning(pid)) await ns.sleep(500);
						sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					};
					ns.tprint('hacking ' + target);
					//await ns.nuke(target);
					let threading = ((ns.getServerMaxRam('home')-ns.getServerUsedRam('home'))/ ns.getScriptRam('hacking.js'));
					let available = ns.getServerMoneyAvailable(target);
					let pid = ns.run('hacking.js', threading, target);
					while (ns.isRunning(pid)) await ns.sleep(500);
					let newavail = ns.getServerMoneyAvailable(target);
					ns.tprint('Cashed out ' + (available - newavail) + ' out of ' + available + ' available');
				};
			} else {ns.tprint('Too many ports needed')};
		};
	};
}