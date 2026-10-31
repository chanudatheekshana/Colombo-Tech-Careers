// app.js — Colombo Tech Careers | Application Logic
// Imports data from data.js
import { activeJobsData, target20FitGaps, employerDirectory } from './data.js';

// ============================================================
// INITIALIZATION
// ============================================================
document.addEventListener("DOMContentLoaded", () => {
    initCharts();
    renderJobs(activeJobsData);
    renderGapMatrix("1");
    renderDirectory(employerDirectory);
    setupEventListeners();
    setupScrollHeader();
});

// ============================================================
// 1. CHART INITIALIZATION (Chart.js — Teal/Cyan/Slate Palette)
// ============================================================
function initCharts() {
    // Chart 1: Tier Distribution Bar Chart
    const tierCtx = document.getElementById('tierDistributionChart').getContext('2d');
    new Chart(tierCtx, {
        type: 'bar',
        data: {
            labels: ['Tier 1', 'Tier 2', 'Tier 3', 'Tier 4'],
            datasets: [{
                label: 'Active Opportunities',
                data: [17, 10, 9, 10],
                backgroundColor: ['#0d9488', '#06b6d4', '#1e293b', '#94a3b8'],
                borderRadius: 8,
                borderSkipped: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { precision: 0, color: '#64748b' },
                    grid: { color: '#f1f5f9' }
                },
                x: {
                    ticks: { color: '#64748b', font: { family: 'Plus Jakarta Sans', weight: '600' } },
                    grid: { display: false }
                }
            }
        }
    });

    // Chart 2: Location Doughnut Chart
    const locCtx = document.getElementById('locationHubChart').getContext('2d');
    new Chart(locCtx, {
        type: 'doughnut',
        data: {
            labels: ['Central Colombo', 'Kollupitiya', 'Trace Expert City', 'Suburbs'],
            datasets: [{
                data: [22, 6, 5, 13],
                backgroundColor: ['#0d9488', '#06b6d4', '#1e293b', '#cbd5e1'],
                borderColor: '#ffffff',
                borderWidth: 4,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        boxWidth: 10,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: { size: 11, family: 'Plus Jakarta Sans' },
                        color: '#475569'
                    }
                }
            }
        }
    });
}

// ============================================================
// 2. RENDER JOB CARDS GRID
// ============================================================
function renderJobs(jobs) {
    const grid = document.getElementById("jobGrid");
    document.getElementById("visibleCount").innerText = jobs.length;

    if (jobs.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-12 bg-white rounded-[2rem] border border-slate-200 shadow-soft">
                <svg class="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
                <p class="text-slate-500 font-medium">No vacancies match your criteria.</p>
                <p class="text-slate-400 text-sm mt-1">Try adjusting your keywords or filters.</p>
            </div>`;
        return;
    }

    grid.innerHTML = jobs.map(job => {
        let tierBadgeColor = "bg-teal-50 text-teal-700 border-teal-200";
        let accentColor = "bg-teal-500";
        if (job.tier === "Tier 2") { tierBadgeColor = "bg-cyan-50 text-cyan-700 border-cyan-200"; accentColor = "bg-cyan-500"; }
        if (job.tier === "Tier 3") { tierBadgeColor = "bg-blue-50 text-blue-700 border-blue-200"; accentColor = "bg-blue-500"; }
        if (job.tier === "Tier 4") { tierBadgeColor = "bg-indigo-50 text-indigo-700 border-indigo-200"; accentColor = "bg-indigo-500"; }

        return `
            <div class="job-card bg-white rounded-[1.5rem] p-6 border border-slate-100 shadow-soft hover:shadow-floating hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                <div class="accent-bar absolute top-0 left-0 w-full h-1 ${accentColor}"></div>
                <div>
                    <div class="flex justify-between items-start mb-4">
                        <span class="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${tierBadgeColor}">
                            ${job.tier}
                        </span>
                        <span class="text-xs font-medium text-slate-400 flex items-center">
                            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                            </svg>
                            ${job.location}${job.subLoc ? ' (' + job.subLoc + ')' : ''}
                        </span>
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 leading-snug group-hover:text-teal-700 transition-colors">${job.title}</h3>
                    <p class="text-sm font-semibold text-slate-500 mt-1">${job.company}</p>
                    <p class="text-xs text-slate-600 mt-4 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                        <strong class="text-slate-800 block mb-1">Requirements:</strong> ${job.reqs}
                    </p>
                </div>
                <div class="pt-4 mt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                    <span class="text-slate-400 font-medium">${job.link}</span>
                    <span class="text-teal-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        View Role
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                        </svg>
                    </span>
                </div>
            </div>`;
    }).join("");
}

// ============================================================
// 3. RENDER GAP MATRIX
// ============================================================
function renderGapMatrix(tier) {
    const container = document.getElementById("gapMatrixContainer");
    const items = target20FitGaps[tier] || [];

    container.innerHTML = items.map(item => `
        <div class="bg-slate-50/50 border border-slate-200 p-6 rounded-[1.5rem] space-y-4 hover:border-teal-300 transition-colors">
            <div class="flex justify-between items-start">
                <h3 class="text-base font-bold text-slate-900 pr-4">${item.title}</h3>
                <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap ${
                    item.fit === 'Core Fit'   ? 'bg-emerald-100 text-emerald-800' :
                    item.fit === 'Strong Fit' ? 'bg-teal-100 text-teal-800' :
                    item.fit === 'Good Fit'   ? 'bg-cyan-100 text-cyan-800' :
                                                'bg-blue-100 text-blue-800'
                }">
                    ${item.fit}
                </span>
            </div>
            <div class="space-y-3 text-sm">
                <div class="flex items-start">
                    <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 mr-2 flex-shrink-0"></div>
                    <p class="text-slate-600"><strong class="text-slate-800 block text-xs uppercase tracking-wide mb-0.5">Verified Alignments</strong>${item.aligned}</p>
                </div>
                <div class="flex items-start">
                    <div class="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 mr-2 flex-shrink-0"></div>
                    <p class="text-slate-600"><strong class="text-slate-800 block text-xs uppercase tracking-wide mb-0.5">Keyword Gaps</strong>${item.gaps}</p>
                </div>
            </div>
            <div class="pt-3 border-t border-slate-200 text-xs bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <strong class="text-teal-700 block mb-1 uppercase tracking-wide">Strategic Bridge Action</strong>
                <span class="text-slate-600 leading-relaxed">${item.action}</span>
            </div>
        </div>
    `).join("");
}

// ============================================================
// 4. RENDER EMPLOYER DIRECTORY TABLE
// ============================================================
function renderDirectory(directory) {
    const tbody = document.getElementById("directoryTableBody");
    tbody.innerHTML = directory.map(emp => `
        <tr class="hover:bg-teal-50/30 transition-colors group">
            <td class="p-4 font-bold text-slate-900 whitespace-nowrap">${emp.name}</td>
            <td class="p-4 text-slate-600 text-xs max-w-[200px]">${emp.address}</td>
            <td class="p-4 text-slate-600 font-mono text-xs">${emp.phone}</td>
            <td class="p-4 text-teal-700 font-medium font-mono text-xs group-hover:text-teal-900 transition-colors">${emp.email}</td>
            <td class="p-4 text-slate-500 text-xs">${emp.focus}</td>
        </tr>
    `).join("");
}

// ============================================================
// 5. EVENT LISTENERS (Filters, Gap Matrix, Directory Search)
// ============================================================
function setupEventListeners() {
    const searchInput   = document.getElementById("searchInput");
    const tierSelect    = document.getElementById("tierSelect");
    const locationSelect = document.getElementById("locationSelect");
    const resetBtn      = document.getElementById("resetFilters");

    function filterJobs() {
        const query       = searchInput.value.toLowerCase();
        const selectedTier = tierSelect.value;
        const selectedLoc  = locationSelect.value;

        const filtered = activeJobsData.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(query) ||
                                  job.company.toLowerCase().includes(query) ||
                                  job.reqs.toLowerCase().includes(query);
            const matchesTier = (selectedTier === "ALL" || job.tier === selectedTier);

            let matchesLoc = true;
            if (selectedLoc === "Colombo")    matchesLoc = (job.location === "Colombo");
            if (selectedLoc === "Kollupitiya") matchesLoc = (job.location === "Kollupitiya" || job.subLoc === "Colombo 03");
            if (selectedLoc === "Suburbs")    matchesLoc = (job.location === "Suburbs");

            return matchesSearch && matchesTier && matchesLoc;
        });

        renderJobs(filtered);
    }

    searchInput.addEventListener("input", filterJobs);
    tierSelect.addEventListener("change", filterJobs);
    locationSelect.addEventListener("change", filterJobs);

    resetBtn.addEventListener("click", () => {
        searchInput.value = "";
        tierSelect.value = "ALL";
        locationSelect.value = "ALL";
        renderJobs(activeJobsData);
    });

    // Gap Matrix Tier Switcher
    const fitBtns = document.querySelectorAll(".fit-tier-btn");
    fitBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            fitBtns.forEach(b => {
                b.classList.remove("active", "bg-slate-900", "text-white", "shadow-md");
                b.classList.add("bg-slate-50", "text-slate-600", "border", "border-slate-200");
            });
            btn.classList.remove("bg-slate-50", "text-slate-600", "border", "border-slate-200");
            btn.classList.add("active", "bg-slate-900", "text-white", "shadow-md");
            renderGapMatrix(btn.getAttribute("data-tier"));
        });
    });

    // Directory Search
    const dirSearch = document.getElementById("dirSearchInput");
    dirSearch.addEventListener("input", e => {
        const q = e.target.value.toLowerCase();
        const filteredDir = employerDirectory.filter(emp =>
            emp.name.toLowerCase().includes(q) ||
            emp.email.toLowerCase().includes(q) ||
            emp.focus.toLowerCase().includes(q)
        );
        renderDirectory(filteredDir);
    });
}

// ============================================================
// 6. STICKY HEADER SCROLL ENHANCEMENT
// ============================================================
function setupScrollHeader() {
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

