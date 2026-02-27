/**
 * Dispatch Wizard AI — Terminal
 * Interactive terminal UI for browsing and dispatching service requests.
 */
(function () {
  'use strict';

  // ── Service catalog ──────────────────────────────────────────────────
  const SERVICES = [
    { id: 1, name: 'Accounting & Bookkeeping', providers: ['AccuBooks Pro', 'LedgerLine', 'NumeriCo'], eta: '1-2 days' },
    { id: 2, name: 'Legal Consultation',       providers: ['BizLegal Group', 'ClearCounsel', 'LawBridge'],  eta: '2-3 days' },
    { id: 3, name: 'Business Funding',         providers: ['CapitalWave', 'FundSpark', 'GrowthVault'],      eta: '3-5 days' },
    { id: 4, name: 'SEO / PPC / Ads',          providers: ['RankRocket', 'ClickForge', 'AdPulse'],          eta: '1-3 days' },
    { id: 5, name: 'Web Design & Development',  providers: ['PixelCraft', 'DevHorizon', 'SiteForge'],        eta: '5-7 days' },
    { id: 6, name: 'CRM & Automation',          providers: ['FlowStack', 'AutomateIQ', 'CRMNexus'],         eta: '2-4 days' },
    { id: 7, name: 'Branding & Logo Design',    providers: ['BrandMint', 'LogoLab', 'IdentityCo'],          eta: '3-5 days' },
    { id: 8, name: 'HR & Hiring Tools',         providers: ['TalentBridge', 'HireWell', 'PeopleOps Pro'],    eta: '2-3 days' },
    { id: 9, name: 'Sales Strategy & Coaching',  providers: ['CloseMaster', 'PipelinePro', 'SalesEdge'],      eta: '1-2 days' },
  ];

  // ── State ────────────────────────────────────────────────────────────
  let wizardStep   = 'idle';   // idle | select-service | select-provider | confirm | done
  let selectedSvc  = null;
  let selectedProv = null;
  let dispatches   = [];

  // ── DOM refs (set during init) ───────────────────────────────────────
  let outputEl, inputEl, promptEl;

  // ── Helpers ──────────────────────────────────────────────────────────
  function print(text, cls) {
    var line = document.createElement('div');
    line.className = 'term-line' + (cls ? ' ' + cls : '');
    line.textContent = text;
    outputEl.appendChild(line);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function printHTML(html, cls) {
    var line = document.createElement('div');
    line.className = 'term-line' + (cls ? ' ' + cls : '');
    line.innerHTML = html;
    outputEl.appendChild(line);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  function blankLine() {
    print('');
  }

  function setPrompt(text) {
    promptEl.textContent = text;
  }

  function resetWizard() {
    wizardStep   = 'idle';
    selectedSvc  = null;
    selectedProv = null;
    setPrompt('wizard>');
  }

  // ── ASCII banner ─────────────────────────────────────────────────────
  function printBanner() {
    var banner = [
      '  ___  _                 _       _     ',
      ' |   \\(_)____ __  __ _ | |_ __ | |_   ',
      ' | |) | (_-< \'_ \\/ _` ||  _/ _||   \\  ',
      ' |___/|_/__/ .__/\\__,_| \\__\\__||_||_| ',
      '           |_|                          ',
      '  W I Z A R D   A I     ⚡              ',
    ];
    banner.forEach(function (l) { print(l, 'term-banner'); });
    blankLine();
    print('Welcome to Dispatch Wizard AI.', 'term-info');
    print('Type "help" to see available commands.', 'term-info');
    blankLine();
  }

  // ── Command handlers ─────────────────────────────────────────────────
  var commands = {};

  commands.help = function () {
    print('Available commands:', 'term-heading');
    blankLine();
    printHTML('  <span class="term-cmd">services</span>        — List all available service categories');
    printHTML('  <span class="term-cmd">dispatch</span>        — Start the dispatch wizard');
    printHTML('  <span class="term-cmd">status</span>          — View your dispatched requests');
    printHTML('  <span class="term-cmd">info &lt;id&gt;</span>       — Details about a service (e.g. info 3)');
    printHTML('  <span class="term-cmd">clear</span>           — Clear the terminal');
    printHTML('  <span class="term-cmd">help</span>            — Show this help message');
    blankLine();
  };

  commands.services = function () {
    print('Available Services:', 'term-heading');
    blankLine();
    SERVICES.forEach(function (s) {
      printHTML('  <span class="term-id">[' + s.id + ']</span> ' + s.name + '  <span class="term-muted">(ETA: ' + s.eta + ')</span>');
    });
    blankLine();
    print('Use "info <id>" for details or "dispatch" to start a request.', 'term-info');
    blankLine();
  };

  commands.info = function (args) {
    var id = parseInt(args[0], 10);
    var svc = SERVICES.find(function (s) { return s.id === id; });
    if (!svc) {
      print('Service not found. Use "services" to see the list.', 'term-error');
      return;
    }
    blankLine();
    print('Service: ' + svc.name, 'term-heading');
    print('  Estimated turnaround: ' + svc.eta);
    print('  Providers:');
    svc.providers.forEach(function (p, i) {
      printHTML('    <span class="term-id">[' + (i + 1) + ']</span> ' + p);
    });
    blankLine();
  };

  commands.dispatch = function () {
    wizardStep = 'select-service';
    blankLine();
    print('── Dispatch Wizard ───────────────────────', 'term-heading');
    print('Step 1/3: Select a service category', 'term-info');
    blankLine();
    SERVICES.forEach(function (s) {
      printHTML('  <span class="term-id">[' + s.id + ']</span> ' + s.name);
    });
    blankLine();
    print('Enter the service number:', 'term-info');
    setPrompt('service #>');
  };

  commands.status = function () {
    if (dispatches.length === 0) {
      print('No dispatch requests yet. Use "dispatch" to create one.', 'term-info');
      blankLine();
      return;
    }
    blankLine();
    print('Your Dispatch Requests:', 'term-heading');
    blankLine();
    dispatches.forEach(function (d, i) {
      printHTML(
        '  <span class="term-id">[' + (i + 1) + ']</span> ' +
        d.service + ' → <span class="term-success">' + d.provider + '</span>' +
        '  <span class="term-muted">(ETA: ' + d.eta + ' | ' + d.status + ')</span>'
      );
    });
    blankLine();
  };

  commands.clear = function () {
    outputEl.innerHTML = '';
  };

  // ── Wizard step handlers ─────────────────────────────────────────────
  function handleWizardInput(input) {
    if (input === 'cancel' || input === 'exit' || input === 'quit') {
      print('Dispatch cancelled.', 'term-error');
      blankLine();
      resetWizard();
      return;
    }

    switch (wizardStep) {
      case 'select-service': {
        var id = parseInt(input, 10);
        selectedSvc = SERVICES.find(function (s) { return s.id === id; });
        if (!selectedSvc) {
          print('Invalid selection. Enter a number from 1-' + SERVICES.length + ', or "cancel".', 'term-error');
          return;
        }
        wizardStep = 'select-provider';
        blankLine();
        print('Step 2/3: Choose a provider for ' + selectedSvc.name, 'term-info');
        blankLine();
        selectedSvc.providers.forEach(function (p, i) {
          printHTML('  <span class="term-id">[' + (i + 1) + ']</span> ' + p);
        });
        blankLine();
        print('Enter the provider number:', 'term-info');
        setPrompt('provider #>');
        break;
      }

      case 'select-provider': {
        var idx = parseInt(input, 10) - 1;
        if (idx < 0 || idx >= selectedSvc.providers.length) {
          print('Invalid selection. Enter a number from 1-' + selectedSvc.providers.length + ', or "cancel".', 'term-error');
          return;
        }
        selectedProv = selectedSvc.providers[idx];
        wizardStep = 'confirm';
        blankLine();
        print('Step 3/3: Confirm your dispatch', 'term-info');
        blankLine();
        print('  Service  : ' + selectedSvc.name);
        print('  Provider : ' + selectedProv);
        print('  ETA      : ' + selectedSvc.eta);
        blankLine();
        print('Dispatch this request? (yes / no)', 'term-info');
        setPrompt('confirm>');
        break;
      }

      case 'confirm': {
        var answer = input.toLowerCase();
        if (answer === 'yes' || answer === 'y') {
          dispatches.push({
            service:  selectedSvc.name,
            provider: selectedProv,
            eta:      selectedSvc.eta,
            status:   'Dispatched',
          });
          blankLine();
          print('Request dispatched successfully!', 'term-success');
          print(selectedSvc.name + ' → ' + selectedProv, 'term-success');
          print('Estimated turnaround: ' + selectedSvc.eta, 'term-info');
          blankLine();
          print('Use "status" to track your requests.', 'term-info');
          blankLine();
          resetWizard();
        } else if (answer === 'no' || answer === 'n') {
          print('Dispatch cancelled.', 'term-error');
          blankLine();
          resetWizard();
        } else {
          print('Please type "yes" or "no".', 'term-error');
        }
        break;
      }

      default:
        resetWizard();
    }
  }

  // ── Input processing ─────────────────────────────────────────────────
  function processInput(raw) {
    var input = raw.trim();
    if (!input) return;

    // Echo the input
    printHTML('<span class="term-prompt-echo">' + promptEl.textContent + '</span> ' + input);

    // If inside wizard flow, route to wizard handler
    if (wizardStep !== 'idle') {
      handleWizardInput(input);
      return;
    }

    var parts = input.split(/\s+/);
    var cmd   = parts[0].toLowerCase();
    var args  = parts.slice(1);

    if (commands[cmd]) {
      commands[cmd](args);
    } else {
      print('Unknown command: ' + cmd + '. Type "help" for available commands.', 'term-error');
      blankLine();
    }
  }

  // ── Initialization ───────────────────────────────────────────────────
  function init() {
    var terminal = document.getElementById('dispatch-terminal');
    if (!terminal) return;

    outputEl = terminal.querySelector('.term-output');
    inputEl  = terminal.querySelector('.term-input');
    promptEl = terminal.querySelector('.term-prompt');

    if (!outputEl || !inputEl || !promptEl) return;

    printBanner();

    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        processInput(inputEl.value);
        inputEl.value = '';
      }
    });

    // Focus the input when clicking anywhere in the terminal
    terminal.addEventListener('click', function () {
      inputEl.focus();
    });
  }

  // Run init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
