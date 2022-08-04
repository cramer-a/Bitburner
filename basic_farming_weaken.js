/** @param {NS} ns */
export async function main(ns) {
	while (true) {
		var home = ns.getHostname();
		var connectedservers = ns.scan('home');
		for (let i = 0; i < connectedservers.length; i++) {
			if (ns.getServerNumPortsRequired(connectedservers.at(i)) < 1) {
				var target = connectedservers.at(i);
				ns.print('Target is ' + target);
				let skillgap = ns.getServerRequiredHackingLevel(target) - ns.getHackingLevel();
				if (skillgap > 0) {
					ns.print('Skill gap is too high: ' + skillgap)
				} else {
					if (ns.hasRootAccess(target) == true) {
						ns.print('Having root');
					} else {
						ns.print('No Root');
						ns.nuke(target);
						ns.print('Nuked');
					};
					var sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					ns.print('security difference is ' + sec);
					while (sec > 0) {
						ns.print('weaken')
						let threading = Math.floor((ns.getServerMaxRam(home)-ns.getServerUsedRam(home))/ ns.getScriptRam('weakening.js'));
						let pid = ns.run('weakening.js', threading, target);
    					while (ns.isRunning(pid)) await ns.sleep(500);
						sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					};
					var growth_perc = (1-(ns.getServerMoneyAvailable(target)/ns.getServerMaxMoney(target)));
					ns.print('room for growth is ' + growth_perc);
					for (let j = 0; j < 10; j++) {
						if (growth_perc > 0.25) {
							ns.print('Growing');
							let threading = ((ns.getServerMaxRam(home)-ns.getServerUsedRam(home))/ ns.getScriptRam('growing.js'));
							let pid = ns.run('growing.js', threading, target);
							while (ns.isRunning(pid)) await ns.sleep(500);
							growth_perc = (1-(ns.getServerMoneyAvailable(target)/ns.getServerMaxMoney(target)));
							ns.print('- Round ' + j + '/ - Room for growth now ' + growth_perc + ' -');
						} else {break};
					};
					sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					ns.print('security difference is ' + sec);
					while (sec > 0) {
						ns.print('weaken')
						let threading = ((ns.getServerMaxRam(home)-ns.getServerUsedRam(home))/ ns.getScriptRam('weakening.js'));
						let pid = ns.run('weakening.js', threading, target);
    					while (ns.isRunning(pid)) await ns.sleep(500);
						sec = ns.getServerSecurityLevel(target) - ns.getServerMinSecurityLevel(target);
					};
					ns.print('hacking ' + target);
					let maxthreading = Math.floor(0.1/ns.hackAnalyze(target));
					//await ns.nuke(target);
					let threading = Math.floor((ns.getServerMaxRam(home)-ns.getServerUsedRam(home))/ ns.getScriptRam('hacking.js'));
					let available = ns.getServerMoneyAvailable(target);
					let pid = ns.run('hacking.js', Math.min(maxthreading, threading), target);
					while (ns.isRunning(pid)) await ns.sleep(500);
					let newavail = ns.getServerMoneyAvailable(target);
					ns.print('Cashed out ' + (available - newavail) + ' out of ' + available + ' available');
				};
			} else {ns.print('Too many ports needed for ' + connectedservers.at(i))};
		};
	};
}