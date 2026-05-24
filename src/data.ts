import { Article } from './types';

export const sampleArticles: Article[] = [
  // ==================== NATIONAL / POLITICS (10 Articles) ====================
  {
    id: 1,
    category: 'National',
    title: 'Historic Infrastructure Bill Approved for Modernization of Indian Railways Corridors',
    excerpt: 'The Union Cabinet has sanctioned a budget of ₹85,000 Crore to overhaul key trunk routes, introducing bullet-train readiness and state-of-the-art automatic train protection systems.',
    body: `<p>In a major boost to national infrastructure, the Union Cabinet chaired by the Prime Minister has approved a landmark ₹85,000 Crore railway modernization corridor bill. The primary objective is to upgrade high-density routes connecting key metropolitan centers including New Delhi, Mumbai, Bengaluru, and Chennai.</p>
           <p>The extensive corridor development includes:</p>
           <ul>
             <li><strong>Complete Route Kavach Deployment:</strong> Implementation of the indigenous Automatic Train Protection (ATP) system on over 10,000 route kilometers to ensure zero-accident corridors.</li>
             <li><strong>High-Speed Readiness:</strong> Upgrading track beds, overhead lines, and signaling systems to support speeds of up to 160-200 km/h for Vande Bharat Express fleets.</li>
             <li><strong>Eco-Station Redevelopment:</strong> Transitioning 150 terminal junctions into smart, solar-powered hubs with modern passenger lounges, transit business centers, and touchless ticket counters.</li>
           </ul>
           <blockquote class="my-6 bg-zinc-50 dark:bg-zinc-950/60 p-5 rounded-2xl border-l-4 border-l-brand-crimson dark:border-l-red-500 italic text-zinc-900 dark:text-zinc-100 font-bold shadow-sm">
             "This represents the largest physical capital deployment in the history of our railway network—paving the way for safe, global-tier speed boundaries in public commuter travel."
           </blockquote>
           <p>Industrial bodies and logistical federations have welcomed the bill, noting that faster turnaround speeds will slash shipping timelines by nearly thirty-five percent, stabilizing nationwide commodity markets.</p>`,
    author: 'Rajesh Sharma',
    authorAvatar: 'https://picsum.photos/seed/author_rajesh/100/100',
    time: '5 min ago',
    timestamp: Date.now() - 5 * 60 * 1000,
    views: '124.5K',
    image: 'https://picsum.photos/seed/national1/800/450',
    trendingScore: 99,
    isBreaking: true
  },
  {
    id: 2,
    category: 'National',
    title: 'Historic Clean-Energy Initiative: Gujarat Unveils Asia’s Largest Single-Site Solar & Wind Hybrid Farm',
    excerpt: 'Located in the salt plains of Kutch, the mammoth eco-farm spans over 70,000 hectares, generating 30 Gigawatts of clean renewable electricity for central distribution grids.',
    body: `<p>Gujarat has written a historic chapter in Asia’s green transition by commissioning a giant 30-Gigawatt solar and wind hybrid installation in the Khavda region of Kutch. The massive infrastructure project represents a critical step toward India’s ultimate goal of achieving 500 GW of non-fossil energy capacity by 2030.</p>
           <p>Equipped with smart AI-driven sun-tracking panels and localized aerodynamic wind turbines, the hybrid hub completely stabilizes power outputs during peak hours, tackling the historical load-fluctuation challenges associated with green energy.</p>
           <p>Local state officials verified that the farm is already operating at twenty percent capacity, successfully supplying zero-emission electricity to industrial grids in neighboring states.</p>`,
    author: 'Sunita Mehra',
    authorAvatar: 'https://picsum.photos/seed/author_sunita/100/100',
    time: '45 min ago',
    timestamp: Date.now() - 45 * 60 * 1000,
    views: '88.2K',
    image: 'https://picsum.photos/seed/national2/600/400',
    trendingScore: 91
  },
  {
    id: 3,
    category: 'National',
    title: 'Election Commission Deploys Advanced Multi-layered Cryptographic Voting Security Systems',
    excerpt: 'To foster unimpeachable integrity, the upcoming regional legislative elections will pilot state-of-the-art secure transmission frameworks and digital logs.',
    body: `<p>The Election Commission has announced the deployment of a new multi-layered cryptographic safety lock in polling booths to preserve absolute public trust in democratic systems. The new digital protocols provide secure, tamper-proof logs at every stage of the voting lifecycle.</p>
           <p>The system relies on verified physical security modules combined with real-time end-to-end encrypted audit logs. Industry experts have lauded the development, identifying it as a pioneering blueprint for international democratic administrations.</p>`,
    author: 'Vikram Malhotra',
    time: '2 hours ago',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    views: '145.0K',
    image: 'https://picsum.photos/seed/national3/600/400',
    trendingScore: 95
  },
  {
    id: 4,
    category: 'National',
    title: 'Smart Cities Network Expands: 15 New Urban Clusters Added for High-Speed Fiber Mesh Integration',
    excerpt: 'Ministry developers announce the integration of Tier-2 towns into the digital-mesh umbrella, facilitating centralized public safety monitors, high-speed regional Wi-Fi, and smart traffic sensors.',
    body: `<p>The Ministry of Urban Housing and Digital Infrastructure has approved 15 additional cities to join the flagship Smart Cities Network. This phase focuses primarily on creating high-performance fiber rings that link public safety sensors, ambulance routing signals, and air quality telemetry in real-time.</p>
           <p>By optimizing traffic intersections using machine learning algorithms, the program aims to cut congestion times by twenty-five percent across business districts.</p>`,
    author: 'Anil Deshmukh',
    time: '5 hours ago',
    timestamp: Date.now() - 5 * 60 * 60 * 1000,
    views: '62.1K',
    image: 'https://picsum.photos/seed/national4/600/400',
    trendingScore: 84
  },
  {
    id: 5,
    category: 'National',
    title: 'ISRO Successfully Positions Reusable Launch Vehicle in Safe Low Earth Orbit Strategy',
    excerpt: 'Nailing a highly complex automated flight profile, India’s miniature space plane completed crucial structural maneuvers before descending safely over the Bay of Bengal.',
    body: `<p>The Indian Space Research Organisation (ISRO) has marked an outstanding national milestone by successfully launching and positioning its indigenous Reusable Launch Vehicle (RLV) in low Earth orbit. The space-plane model carried out automated orientation maneuvers, proving its composite thermal shield panels can safely withstand atmospheric re-entry conditions.</p>
           <p>The successful test significantly drives down payload costs, making India a highly competitive launch hub for global satellite networks.</p>`,
    author: 'Kiran Nair',
    authorAvatar: 'https://picsum.photos/seed/author_kiran/100/100',
    time: '9 hours ago',
    timestamp: Date.now() - 9 * 60 * 60 * 1000,
    views: '210.4K',
    image: 'https://picsum.photos/seed/national5/600/400',
    trendingScore: 98,
    isTrending: true
  },
  {
    id: 6,
    category: 'National',
    title: 'Historic Judicial Digital Repository Project Launched to Cut Legacy Court Case Delay Figures',
    excerpt: 'Utilizing sophisticated smart index modules, the Supreme Court initiates digital archives to speed up file retrieval speeds and dispatch legal notices in seconds.',
    body: `<p>In a major boost to public justice, the Chief Justice of India launched the National Judicial Digital Repository (NJDR) project today. The cloud system links thousands of regional trials courts with high courts, centralizing millions of historical case records under an easy, searchable index.</p>
           <p>Attorneys can now submit filings securely online, bypassing standard manual paper cycles that historically added weeks of delay to civil hearings.</p>`,
    author: 'Sanjay Hegde',
    time: '12 hours ago',
    timestamp: Date.now() - 12 * 60 * 60 * 1000,
    views: '45.8K',
    image: 'https://picsum.photos/seed/national6/600/400',
    trendingScore: 78
  },
  {
    id: 7,
    category: 'National',
    title: 'National Startup League Unveils ₹10,000 Crore Seed Fund for Agri-Tech Innovation Hubs',
    excerpt: 'Aimed at optimizing agricultural logistics, the sovereign funds will provide debt-free equity to startups building drone mapping tools and cold-storage operations.',
    body: `<p>The Ministry of Finance has officially structured a new ₹10,000 Crore sovereign fund to expand Agri-Tech ecosystems. The fund targets early-stage startups that focus on automated crop diagnostics, soil health monitoring using remote IoT sensors, and local cold-chain logistics to prevent crop losses.</p>
           <p>By empowering farmers to connect directly with wholesale buyers via central smartphone interfaces, the program stabilizes margins and eliminates middlemen commissions.</p>`,
    author: 'Meera Johar',
    time: '18 hours ago',
    timestamp: Date.now() - 18 * 60 * 60 * 1000,
    views: '73.9K',
    image: 'https://picsum.photos/seed/national7/600/400',
    trendingScore: 82
  },
  {
    id: 8,
    category: 'National',
    title: 'Semi-Conductor Fab Ecosystem in Gujarat Receives Clear Environmental and Grid Approvals',
    excerpt: 'Construction of the advanced silicon fabrication plant is set to commence next month, solidifying India’s place in the global microchip supply chain.',
    body: `<p>The mega Silicon Fab plant in Gujarat has cleared all regulatory grid and environmental assessments. The state-of-the-art facility will produce high-volume 28nm and 40nm chips, which are critical for automotive, smartphone, and electrical grid appliances worldwide.</p>
           <p>The developer confirmed that production lines will be powered entirely by the newly commissioned solar hybrids, establishing the world’s first completely green microchip foundry.</p>`,
    author: 'Devendra Gowda',
    time: '1 day ago',
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    views: '94.2K',
    image: 'https://picsum.photos/seed/national8/600/400',
    trendingScore: 89
  },
  {
    id: 9,
    category: 'National',
    title: 'Historic Preservation Project Launched to Document and Restore Over 500 Heritage Sites',
    excerpt: 'Archaeological authorities initiate advanced 3D laser scanners to construct precise interactive replicas of structural monuments across the subcontinent.',
    body: `<p>The Archaeological Survey of India has announced a comprehensive project to construct digital twins of over 500 historic monuments. Using advanced lidar scanning scanners, the records preserve minute architectural details with millimeter accuracy.</p>
           <p>The resulting databases will be open to universities, allowing students globally to explore India’s structural wonders in virtual classrooms.</p>`,
    author: 'Aarti Krishnamurthy',
    time: '1 day ago',
    timestamp: Date.now() - 30 * 60 * 60 * 1000,
    views: '34.5K',
    image: 'https://picsum.photos/seed/national9/600/400',
    trendingScore: 70
  },
  {
    id: 10,
    category: 'National',
    title: 'Central Healthcare Network Deploys Mobile Tele-Medicine Trucks for Remote Sectors',
    excerpt: 'Equipped with digital diagnostic panels, satellite communication decks, and medical supplies, the fleet brings primary care to thousands of deep villages.',
    body: `<p>The Ministry of Health has flagged off 250 advanced tele-medicine vehicles. Designed specifically to navigate rugged regional terrains, these mobile labs connect patients in remote mountainous and forest sectors with leading cardiologists and specialists in metros.</p>
           <p>The vans feature automated blood analyzers, digital ultrasound scanners, and core diagnostic devices, reducing diagnostic times from days to minutes.</p>`,
    author: 'Dr. Vivek Roy',
    time: '2 days ago',
    timestamp: Date.now() - 48 * 60 * 60 * 1000,
    views: '52.1K',
    image: 'https://picsum.photos/seed/national10/600/400',
    trendingScore: 75
  },

  // ==================== WORLD / INTERNATIONAL (10 Articles) ====================
  {
    id: 11,
    category: 'World',
    title: 'Global Summit on Climate Change Reaches Landmark Agreement',
    excerpt: 'Leaders from over 190 nations have signed a historic climate pact, committing to reduce carbon emissions by historic levels by 2030 and financing green transition infrastructures in developing economies.',
    body: `<p>The UN-backed Global Climate Summit in Geneva concluded with a historic breakthrough, as negotiators from 195 nations signed the Geneva Ecological Accord. Under the treaty, signatory states commit to cutting methane emissions by unexpected levels and ramping up clean power capacities three-fold by 2030.</p>
           <p>The accord establishes a ₹100-Billion sovereign green transition fund designed specifically to finance renewable power installations, energy storage grids, and ecological defenses in emerging costal markets.</p>`,
    author: 'Sarah Jenkins',
    authorAvatar: 'https://picsum.photos/seed/author_sarah/100/100',
    time: '2 min ago',
    timestamp: Date.now() - 2 * 60 * 1000,
    views: '45.2K',
    image: 'https://picsum.photos/seed/world1/800/450',
    trendingScore: 98
  },
  {
    id: 12,
    category: 'World',
    title: 'Archaeologists Discover Ancient 3,000-Year-Old Lost City Underwater',
    excerpt: 'Initial findings suggest the submerged city was once a vibrant trading hub in the Mediterranean, remarkably preserved with statues, amphorases, and architectural structures intact under the marine silt.',
    body: `<p>A team of international marine archaeologists off the coast of Alexandria has discovered a pristine ancient city submerged ten meters beneath Mediterranean waters. Preserved for nearly three millennia under thick marine silt, the ruins contain expansive temple forums, towering statues of marble, and centuries-old merchant vessels.</p>
           <p>Historical scholars identify the location as a key trading point linking Greece, Egypt, and neighboring Levantine coastlines, offering unprecedented clues about archaic naval shipping economies.</p>`,
    author: 'Dr. Evelyn Carter',
    authorAvatar: 'https://picsum.photos/seed/author_evelyn/100/100',
    time: '1 hour ago',
    timestamp: Date.now() - 60 * 60 * 1000,
    views: '128.4K',
    image: 'https://picsum.photos/seed/world2/600/400',
    trendingScore: 92
  },
  {
    id: 13,
    category: 'World',
    title: 'European Union Enacts Enforceable New Quality Standards and Regulations for AI',
    excerpt: 'The comprehensive framework seeks to categorize artificial intelligence products by security risk levels, mandate transparency flags for deepfakes, and establish severe fines for non-compliance.',
    body: `<p>The European Parliament has officially voted to enact the AI safety act, the world’s first enforceable, multi-tier regulatory framework for generative systems. The safety laws establish a taxonomy of risk, strictly banning systems that manipulate human behavior or implement intrusive biomolecular tracking without express legal warrants.</p>
           <p>Compliance guides require digital publishers to water-mark all synthetic content, ensuring viewers can instantly identify machine-produced graphics and deepfakes.</p>`,
    author: 'Marc Dupont',
    time: '4 hours ago',
    timestamp: Date.now() - 4 * 60 * 60 * 1000,
    views: '35.6K',
    image: 'https://picsum.photos/seed/world3/600/400',
    trendingScore: 88
  },
  {
    id: 14,
    category: 'World',
    title: 'Global Supply Chain Bottlenecks Expected to End as Major Port Upgrades Complete',
    excerpt: 'Maritime shipping reports suggest deep-water port automation and new container handling terminals across global sea routes have successfully cut turnaround times by nearly forty percent.',
    body: `<p>Global cargo freight costs have normalized to pre-congestion levels as comprehensive robotic port upgrades wrap up across terminal routes in Singapore, Rotterdam, and Los Angeles. Automated cranes combined with AI-scheduled container shipping coordinates have successfully eliminated double-handling lags.</p>
           <p>Logistical analysis suggests transport timelines for electronics and automotive parts have stabilized, minimizing consumer inventory delays ahead of winter seasons.</p>`,
    author: 'Hana Matsumura',
    time: '12 hours ago',
    timestamp: Date.now() - 12 * 60 * 60 * 1000,
    views: '22.1K',
    image: 'https://picsum.photos/seed/world4/600/400',
    trendingScore: 75
  },
  {
    id: 15,
    category: 'World',
    title: 'Global Energy Alliance Commits To Scaling Safe Green Hydrogen Supply Line Infrastructure',
    excerpt: 'An alliance of twenty-five nations forms to open secure transport corridors and build dedicated liquid hydrogen containment bays at international freight shipping terminals.',
    body: `<p>A global coalition of industrial nations has announced a deep investment strategy to build liquid hydrogen supply corridors. The system targets transitioning long-haul logistics fleets, heavy steel manufacturing furnaces, and massive maritime cargo engines away from fossil dependencies.</p>
           <p>The consortium plans to construct automated green hydrogen hubs powered exclusively by ocean wind parks, providing clean thermal options at scale.</p>`,
    author: 'Alistair Ross',
    time: '18 hours ago',
    timestamp: Date.now() - 18 * 60 * 60 * 1000,
    views: '41.9K',
    image: 'https://picsum.photos/seed/world5/600/400',
    trendingScore: 81
  },
  {
    id: 16,
    category: 'World',
    title: 'UN Announces New Global Treaty to Stabilize Oceanic Ecological Marine Sanctuary Boundaries',
    excerpt: 'The binding pact restricts commercial deep-sea mining and intense trawling operations across thirty percent of international waters to preserve vulnerable marine corridors.',
    body: `<p>In a historic environmental breakthrough, the United Nations has passed the Global Marine Sanctuary Treaty. High-seas ecosystems—which historically lacked comprehensive legal protection—will now navigate state-sponsored conservation oversight, blocking intensive sea mining and unauthorized deep trawling.</p>
           <p>Biologists stated the zones protect essential flight routes of migratory birds and safeguard critical deep-sea coral formations.</p>`,
    author: 'Elena Rostova',
    time: '1 day ago',
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    views: '54.0K',
    image: 'https://picsum.photos/seed/world6/600/400',
    trendingScore: 87
  },
  {
    id: 17,
    category: 'World',
    title: 'International Space Agency Commences Collaborative Deep Space Base Camp Project',
    excerpt: 'Uniting research space fleets from five countries, pre-production modules are slated for assembly to facilitate future crewed deep lunar and Martian orbits.',
    body: `<p>Astronautical organizations have verified a joint plan to construct the Deep Space Base Camp. The orbital module will serve as an essential research, fuel-replenishment, and operations command hub for future crewed trips to Mars.</p>
           <p>The module features revolutionary closed-loop agriculture beds designed to provide fresh crops to crews during multi-month deep flight profiles.</p>`,
    author: 'Dr. John Miller',
    time: '1 day ago',
    timestamp: Date.now() - 28 * 60 * 60 * 1000,
    views: '80.1K',
    image: 'https://picsum.photos/seed/world7/600/400',
    trendingScore: 90
  },
  {
    id: 18,
    category: 'World',
    title: 'Major Archaeological Excavation in Maya Rainforest Locates 50 Previously Unknown Pyramids',
    excerpt: 'Aided by advanced remote aircraft carrying specialized foliage-penetrating radar, scientists trace massive complexes hidden under dense jungle canopy.',
    body: `<p>A regional archeology group utilizing airborne Light Detection and Ranging (LiDAR) has detected a massive Maya ceremonial city hidden beneath the dense jungles of Central America. The discovery includes 50 large stone pyramids, residential courts, and automated irrigation canals.</p>
           <p>Scholars believe the complex was home to over one-hundred-thousand citizens during its peak, highlighting advanced urban planning capabilities without metal tools.</p>`,
    author: 'Sofia Alvarez',
    time: '2 days ago',
    timestamp: Date.now() - 48 * 60 * 60 * 1000,
    views: '115.4K',
    image: 'https://picsum.photos/seed/world8/600/400',
    trendingScore: 93
  },
  {
    id: 19,
    category: 'World',
    title: 'Global Wildlife Census Reports Encouraging Recoveries of Highly Endangered Polar Mammals',
    excerpt: 'Thanks to intense conservation measures and localized protection corridors, populations of key species show steady single-digit growth across remote archipelagos.',
    body: `<p>The Global Conservation Alliance has released positive tracking details from its comprehensive ten-year marine mammal census. Strict international trade caps, localized sanctuary frameworks, and automated drone safety patrols have allowed populations of endangered blue whales to recover by nearly eight percent.</p>
           <p>While ocean temperature challenges persist, ecologists note that safe feeding lanes have successfully minimized vessel collisions.</p>`,
    author: 'Dr. Ingrid Hansen',
    time: '2 days ago',
    timestamp: Date.now() - 52 * 60 * 60 * 1000,
    views: '38.2K',
    image: 'https://picsum.photos/seed/world9/600/400',
    trendingScore: 74
  },
  {
    id: 20,
    category: 'World',
    title: 'Historic Cross-Border Agricultural Tech Corridor Launched to Solve Sovereign Food Security',
    excerpt: 'Consortium partners establish open science networks to distribute climate-resilient organic seeds that flourish in arid and dry soil zones.',
    body: `<p>An alliance of agricultural institutes has launched the Global Crop Resiliency Project. The project distributes open-license, non-GMO climate-hardy crop strains engineered to withstand extreme drought periods and highly saline groundwater lines.</p>
           <p>Pilot planting programs across vulnerable sectors have recorded encouraging double-digit output increases, establishing a key defense against localized food supply disruptions.</p>`,
    author: 'Youssef Al-Masri',
    time: '3 days ago',
    timestamp: Date.now() - 72 * 60 * 60 * 1000,
    views: '44.5K',
    image: 'https://picsum.photos/seed/world10/600/400',
    trendingScore: 78
  },

  // ==================== TECHNOLOGY (10 Articles) ====================
  {
    id: 21,
    category: 'Technology',
    title: 'Silicon Valley AI Startup Unveils Next-Gen Language Model with Real Emotion Sync',
    excerpt: 'The breakthrough system can analyze minor vocal inflections and contextual subtext to adapt its responses dynamically, mimicking human empathy with unexpected authenticity.',
    body: `<p>The AI research lab Synthetix has unveiled EmpathySync-1, a next-generation voice and language model designed to analyze audio signals and inflections in real-time. By tracking micro-pauses, breath frequencies, and tonal changes, the AI adapts its speech curves and contextual patterns to mimic genuine human emotional states.</p>
           <p>The model is engineered for specialized healthcare companion systems, helping patients navigate neurological rehabilitation exercises under a highly reassuring, encouraging assistant.</p>`,
    author: 'David Chen',
    authorAvatar: 'https://picsum.photos/seed/author_david/100/100',
    time: '5 min ago',
    timestamp: Date.now() - 5 * 60 * 1000,
    views: '18.9K',
    image: 'https://picsum.photos/seed/tech1/600/400',
    trendingScore: 95
  },
  {
    id: 22,
    category: 'Technology',
    title: 'Quantum Computing Pioneers Achieve Superconducting Qubit Stability at Room Temp',
    excerpt: 'By enclosing quantum chips within innovative carbon lattice materials, researchers bypassed extreme cryogenic cooling, clearing a massive commercial hurdle for scalable quantum machines.',
    body: `<p>Quantum researchers at the Munich Institute of Technology have recorded a historic breakthrough by stabilizing superconducting qubits at near room-temperature conditions. Historically, quantum chips had to operate within dilution refrigerators chilled to nearly absolute zero to protect highly delicate qubit states from ambient thermal noise.</p>
           <p>By enclosing the superconducting tracks inside high-pressure carbon-nanotube matrices, scientists successfully isolated the qubits, maintaining coherence for over forty minutes—an unprecedented leap for commercial quantum computing.</p>`,
    author: 'Alistair Vance',
    time: '2 hours ago',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    views: '84.0K',
    image: 'https://picsum.photos/seed/tech2/600/400',
    trendingScore: 90
  },
  {
    id: 23,
    category: 'Technology',
    title: 'Solid-State Battery Breakthrough Targets 5-Minute Refuels and 1,000-Mile Ranges',
    excerpt: 'Automotive developers announce pilot manufacturing of glass-ceramic electrolyte cells that completely banish battery fires while holding twice the density of conventional ion modules.',
    body: `<p>Next-era energy developers have launched a pilot manufacturing facility to produce solid-state lithium-sulfide batteries. Replacing standard liquid organic electrolytes with a thin, flexible layer of glass-ceramic compound, the structure completely blocks dendrite formations, preventing thermal fires entirely.</p>
           <p>The resulting cells boast twice the energy density of high-tier lithium-ion modules, allowing electric vehicles to obtain 1,000 miles of highway range under a single, highly rapid five-minute recharge.</p>`,
    author: 'Dr. Robert King',
    time: '5 hours ago',
    timestamp: Date.now() - 5 * 60 * 60 * 1000,
    views: '110.5K',
    image: 'https://picsum.photos/seed/tech3/600/400',
    trendingScore: 85
  },
  {
    id: 24,
    category: 'Technology',
    title: 'Foldable Smart Monitors Move Mainstream as Carbon-Polymer Costs Plummet',
    excerpt: 'New ultra-thin flex displays are entering production at standard desk-panel price parity, prompting office ergonomics design guides to recommend wrap-around workspaces.',
    body: `<p>Display builders have initiated high-volume fabrication of carbon-polymer active matrix organic light-emitting panels. The specialized material allows the monitors to fold, roll, or slide flat without causing degradation along structural fold borders.</p>
           <p>Pricing data shows that flexible 34-inch displays are debuting at standard monitor price tiers, prompting ergonomic specialists to suggest wrapping work desks with seamless widescreen curves.</p>`,
    author: 'Chloe Simmons',
    time: '18 hours ago',
    timestamp: Date.now() - 18 * 60 * 60 * 1000,
    views: '34.2K',
    image: 'https://picsum.photos/seed/tech4/600/400',
    trendingScore: 70
  },
  {
    id: 25,
    category: 'Technology',
    title: 'Autonomous Quad-Drones Complete Zero-G Space Assembly and Repairs Testing',
    excerpt: 'Equipped with visual-mesh tracking modules, autonomous drones coordinate alignment tasks to install composite hull structures without team prompts.',
    body: `<p>Aerospace robotic developers have successfully tested autonomous swarm drones inside simulated zero-gravity thermal chambers. Utilizing visual spatial trackers, the quad-drone flight group can align and weld carbon fiber composite panels with sub-millimeter accuracy, operating entirely without remote human controls.</p>
           <p>This automated capability secures a safe, automated path to build lunar stations and orbital research fuel grids in future eras.</p>`,
    author: 'Marcus Vance',
    time: '1 day ago',
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    views: '42.1K',
    image: 'https://picsum.photos/seed/tech5/600/400',
    trendingScore: 88
  },
  {
    id: 26,
    category: 'Technology',
    title: 'Security Watchdog Warns of Sophisticated Decryption Networks Targeting Cloud Architectures',
    excerpt: 'Advanced mathematical structures designed for quantum computing are being leveraged by malicious actors to breach standard legacy key encryptions.',
    body: `<p>An alliance of cybersecurity researchers has issued a technical alert warning that legacy SSL and RSA encryption parameters are becoming highly vulnerable to quantum-algorithmic factorization modules. Cyber networks are registering attempts to capture encrypted records with the strategy to decrypt them when quantum servers scale.</p>
           <p>Cloud systems are urged to instantly implement post-quantum cryptographic lattices designed to withstand factorization loops entirely.</p>`,
    author: 'Helena Vance',
    time: '1 day ago',
    timestamp: Date.now() - 28 * 60 * 60 * 1000,
    views: '63.9K',
    image: 'https://picsum.photos/seed/tech6/600/400',
    trendingScore: 83
  },
  {
    id: 27,
    category: 'Technology',
    title: 'Advanced Surgical Augmented Reality Headsets Clear Strict Clinical Hospital Trials',
    excerpt: 'By projecting real-time high-fidelity 3D blood vessel grids and neural lines onto patient skin surfaces, the goggles guide surgeons with millimeter precision.',
    body: `<p>Medical technology certifiers have approved the HoloSurg-3 system for active operating theater use. The augmented reality headset projects real-time, interactive MRI and CT diagnostics directly onto the patient’s body, allowing surgeons to locate hidden tissue masses and trace delicate nerve pathways perfectly.</p>
           <p>Clinical data showed that HoloSurg integration reduced incision errors by nearly forty percent, drastically shortening post-operation healing timelines.</p>`,
    author: 'Dr. Raymond Patel',
    time: '2 days ago',
    timestamp: Date.now() - 48 * 60 * 60 * 1000,
    views: '74.2K',
    image: 'https://picsum.photos/seed/tech7/600/400',
    trendingScore: 91
  },
  {
    id: 28,
    category: 'Technology',
    title: 'Next-Generation Silicon Optical Interconnectors Ready for Mass AI Server Integration',
    excerpt: 'Replacing standard copper cables with laser waveguides, the technology boosts data speeds while cutting electricity usage by surprising levels.',
    body: `<p>Leading semiconductor foundries have completed validation testing on silicon organic electro-optic modulators. By transmitting data using micro-lasers instead of copper wire electrons, the interconnects bypass standard physical resistance locks, boosting server card communication rates fifty-fold.</p>
           <p>The breakthrough significantly dampens thermal cooling costs inside hyperscale AI server systems, resolving a major resource drain for developers worldwide.</p>`,
    author: 'Jin-Woo Park',
    time: '2 days ago',
    timestamp: Date.now() - 54 * 60 * 60 * 1000,
    views: '54.5K',
    image: 'https://picsum.photos/seed/tech8/600/400',
    trendingScore: 80
  },
  {
    id: 29,
    category: 'Technology',
    title: 'Smart City Mesh Networks Deploy AI to Coordinate Regional Electrical Grids in Real-time',
    excerpt: 'By anticipating local consumption drops, the dispatch algorithm allocates stored power, preventing grid outages.',
    body: `<p>Municipal energy administrators are deploying smart AI-driven grid managers across metropolitan sectors. The algorithm models localized weather forecasts, office hours, and solar hybrid inputs to route stored power cells to high-demand clusters dynamically.</p>
           <p>Pilot implementations in three smart cities successfully eliminated summer rolling brownouts, establishing a solid blueprint for national distribution networks.</p>`,
    author: 'Nadia El-Amin',
    time: '3 days ago',
    timestamp: Date.now() - 72 * 60 * 60 * 1000,
    views: '35.0K',
    image: 'https://picsum.photos/seed/tech9/600/400',
    trendingScore: 78
  },
  {
    id: 30,
    category: 'Technology',
    title: 'Direct Air Capture Startup Clinches Record Series-C Funding for Mega Absorption Plants',
    excerpt: 'Using state-of-the-art solid-amine filters, the massive sites pull carbon directly from ambient air blocks and lock it in mineral formations deep underground.',
    body: `<p>Ecological engineering startup CarbonLock has closed a ₹4,500 Crore capital round to construct three mega Direct Air Capture facilities. The process uses industrial blower arrays to route ambient air blocks through solid-amine porous filters that chemically bind atmospheric carbon.</p>
           <p>The captured CO2 is mixed with local saline water and injected deep into subterranean basalt layers, where it mineralizes into solid rock within two years, permanently preventing thermal release.</p>`,
    author: 'Liam Vance',
    time: '3 days ago',
    timestamp: Date.now() - 80 * 60 * 60 * 1000,
    views: '49.1K',
    image: 'https://picsum.photos/seed/tech10/600/400',
    trendingScore: 85
  },

  // ==================== BUSINESS (10 Articles) ====================
  {
    id: 31,
    category: 'Business',
    title: 'Indices Breach Historic Peaks on Heavy Tech Rallies and Global Inflows',
    excerpt: 'Benchmark indices surged to record levels today as institutional buyers snapped up blue-chip equities following highly positive quarterly margin performance reports.',
    body: `<p>The Indian stock market logged historic highs today as intense institutional buying across technology, banking, and infrastructure indices drove benchmark boards up by nearly two percent. Foreign portfolio investors (FPIs) locked in record net inflows, tracking highly positive corporate reports.</p>
           <p>Capital strategists believe the surge reflects underlying structural resiliencies, fueled by strong consumer spending indexes and robust tax collections that have consolidated national fiscal cushions.</p>`,
    author: 'Mark Thompson',
    authorAvatar: 'https://picsum.photos/seed/author_mark/100/100',
    time: '15 min ago',
    timestamp: Date.now() - 15 * 60 * 1000,
    views: '64.9K',
    image: 'https://picsum.photos/seed/biz1/600/400',
    trendingScore: 96
  },
  {
    id: 32,
    category: 'Business',
    title: 'Federal Reserve Enacts Surprise Interest Rate Adjustments to Support Job Slacks',
    excerpt: 'Citing persistent inflation cooling towards standard mid-percent bands, policymakers fast-tracked a minor cut to ease consumer credit and foster business asset investments.',
    body: `<p>In an unexpected shift in fiscal stance, the Federal Reserve has enacted a fifty-basis-point interest cut. Moving ahead of standard scheduled sessions, policymakers verified that the decline is planned specifically to safeguard hiring gains and facilitate long-term asset expansion.</p>
           <p>Borrowing and consumer interest rates adjusted downwards immediately, prompting major home and auto lenders to release highly competitive financing tiers across markets.</p>`,
    author: 'Diane Sterling',
    time: '3 hours ago',
    timestamp: Date.now() - 3 * 60 * 60 * 1000,
    views: '48.1K',
    image: 'https://picsum.photos/seed/biz2/600/400',
    trendingScore: 81
  },
  {
    id: 33,
    category: 'Business',
    title: 'Crypto Regulatory Integration Act Sails Through Legislative Committee with Broad Vote',
    excerpt: 'The comprehensive guidelines establish licensing tiers for digital custody networks and codify legal definitions for asset tokens, calming institutional entry apprehensions.',
    body: `<p>A high-level legislative committee has passed the Digital Custody Framework Act with an overwhelming bipartisan majority. The regulations establish clear, predictable legal requirements for entities seeking to host secure crypto trading networks and digital asset tokens across central banking corridors.</p>
           <p>The code strictly mandates capital reserves and absolute separating of client portfolios, calming institutional entities who previously navigated high regulatory uncertainties.</p>`,
    author: 'Vikram Mehta',
    time: '8 hours ago',
    timestamp: Date.now() - 8 * 60 * 60 * 1000,
    views: '52.7K',
    image: 'https://picsum.photos/seed/biz3/600/400',
    trendingScore: 78
  },
  {
    id: 34,
    category: 'Business',
    title: 'Hyperlocal Logistics Ventures Expand Deeply to Indian Tier-2 and Tier-3 Markets',
    excerpt: 'Driven by intense consumer appetites in rapid-fulfillment categories, delivery operations are placing robust cold-storage lockers and sorting hubs inside regional towns.',
    body: `<p>Hyperlocal shipping and delivery startups are scaling operations in regional centers, reporting high double-digit quarterly customer retention metrics. Armed with decentralized micro-sorting warehouses and local cooling locker slots, networks are facilitating fifteen-minute grocery dispatches in town corridors across Punjab, Karnataka, and Maharashtra.</p>
           <p>Economists identify the expansion as a key job creator, offering stable wages to thousands of local gig workers.</p>`,
    author: 'Ananya Roy',
    time: '20 hours ago',
    timestamp: Date.now() - 20 * 60 * 60 * 1000,
    views: '29.3K',
    image: 'https://picsum.photos/seed/biz4/600/400',
    trendingScore: 65
  },
  {
    id: 35,
    category: 'Business',
    title: 'Global Sovereign Wealth Funds Structure Multi-Billion Dollar Indian Infrastructure Deal',
    excerpt: 'Sovereign entities from Singapore and UAE form heavy joint investment locks to facilitate deep-water cargo shipping port structures and fast freight links.',
    body: `<p>A consortium of heavy sovereign wealth pools has officially finalized an investment pact with central developers. The capital targets building highly automated container terminals and dedicated high-speed rail lines to link deep ports directly with inland manufacturing centers.</p>
           <p>The pact establishes stable thirty-year pricing indices, protecting sovereign investors while creating thousands of structural construction jobs.</p>`,
    author: 'Rajiv Chawla',
    time: '1 day ago',
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    views: '44.8K',
    image: 'https://picsum.photos/seed/biz5/600/400',
    trendingScore: 89
  },
  {
    id: 36,
    category: 'Business',
    title: 'Retail Tech Ventures Report Incredible High Double-Digit Growth Figures in Urban Sectors',
    excerpt: 'Seamless digital wallet applications combined with smart local stores drive unprecedented consumer tracking activity and retail indices.',
    body: `<p>Consumer research groups have released tracking metrics showing that offline-to-online retail platforms have registered high business volumes. The consolidation reflects highly refined, secure payment checkouts and localized inventory apps that allow shops to dispatch goods locally in minutes.</p>
           <p>The tech integration has successfully protected family-owned retail shops from online distribution monopolies, keeping local commerce alive.</p>`,
    author: 'Sneha Gupta',
    time: '1 day ago',
    timestamp: Date.now() - 30 * 60 * 60 * 1000,
    views: '51.3K',
    image: 'https://picsum.photos/seed/biz6/600/400',
    trendingScore: 83
  },
  {
    id: 37,
    category: 'Business',
    title: 'Micro-Finance Partnerships Empower Over 10 Million Women Rural Agri-Business Owners',
    excerpt: 'Decentralized credit networks with low fees facilitate agricultural asset scaling and financial inclusion across isolated rural coordinates.',
    body: `<p>An alliance of cooperative regional development banks has successfully scaled micro-credit programs, granting low-interest loans to over 10 million rural women agricultural operators. The funds allow recipients to purchase automated solar water pumps, secure organic seed inputs, and construct small-scale processing mills locally.</p>
           <p>Default figures have logged remarkably low fractions, verifying the high viability of micro-funded commercial networks.</p>`,
    author: 'Padmini Swaminathan',
    time: '2 days ago',
    timestamp: Date.now() - 48 * 60 * 60 * 1000,
    views: '33.9K',
    image: 'https://picsum.photos/seed/biz7/600/400',
    trendingScore: 92
  },
  {
    id: 38,
    category: 'Business',
    title: 'Major Aerospace Logistics Entities Join Force in High-Capacity Commercial Cargo Missions',
    excerpt: 'Private flight builders announce deep logistics integration, cutting cross-continental transport timelines for delicate medical materials to mere hours.',
    body: `<p>Two prominent private space and high-altitude transport groups have announced a strategic alliance to launch next-generation commercial heavy cargo corridors. The system uses high-speed sub-orbital craft to ship critical biological and computing payloads across continents in forty-five minutes.</p>
           <p>The program targets premium medical supply companies, allowing urgent therapeutics and specialized components to bypass standard border delays entirely.</p>`,
    author: 'Richard Branson III',
    time: '2 days ago',
    timestamp: Date.now() - 52 * 60 * 60 * 1000,
    views: '71.5K',
    image: 'https://picsum.photos/seed/biz8/600/400',
    trendingScore: 78
  },
  {
    id: 39,
    category: 'Business',
    title: 'Central Registry Approves Launch of Nationwide Voluntary Carbon Credit Certificate Exchange',
    excerpt: 'The platform codifies standard trading definitions and guarantees transparency, incentivizing industrial groups to cut carbon footprints.',
    body: `<p>The Ministry of Climate and Commerce has approved the operational rules for the National Voluntary Carbon Certificate Exchange. The server platform operates on secure, open ledger registries, tracking emission offset efforts of verified agro-forestry and solar projects.</p>
           <p>Industrial giants can purchase these certificates to neutralize hard-to-abate logistics emissions, creating a major secondary revenue stream for green developers.</p>`,
    author: 'Kunal Sen',
    time: '3 days ago',
    timestamp: Date.now() - 72 * 60 * 60 * 1000,
    views: '28.1K',
    image: 'https://picsum.photos/seed/biz9/600/400',
    trendingScore: 80
  },
  {
    id: 40,
    category: 'Business',
    title: 'Logistics Industry Adopts Global Standardized Solar Powered Heavy Cargo Containers',
    excerpt: 'Intelligent cooling containers maintain internal thermal metrics independently, slashing cold-chain shipping spoil rates by incredible amounts.',
    body: `<p>Shipping lines across global alliances are rolling out standardized 40-foot cargo containers equipped with roof-integrated ultra-thin solar grids and solid-state temperature storage units. These intelligent boxes manage internal cooling demands autonomously during sea transits, blocking food and pharmaceutical degradation.</p>
           <p>Logistical assessments showed that solar-refrigerated containment reduced fuel consumption on cargo vessels by nearly fifteen percent.</p>`,
    author: 'Arindam Ghosh',
    time: '3 days ago',
    timestamp: Date.now() - 84 * 60 * 60 * 1000,
    views: '40.6K',
    image: 'https://picsum.photos/seed/biz10/600/400',
    trendingScore: 72
  },

  // ==================== SPORTS (10 Articles) ====================
  {
    id: 41,
    category: 'Sports',
    title: 'India Secures Epic Victory Against Australia to Retain Border-Gavaskar Trophy',
    excerpt: 'An incredible batting turnaround during the final session of Day 5 culminated in a historic boundary sweep, sealing the high-prestige series with only minutes left to play.',
    body: `<p>In what is already being labeled as the test match of the decade, India’s cricket team secured an iconic 3-wicket victory against Australia at the Gabba on Day 5, successfully retaining the Border-Gavaskar Trophy. Chasing a formidable target of 328 runs in the final sessions, the lineup delivered an outstanding display of strategic boundary hits and calm under immense psychological pressure.</p>
           <p>The final winning boundary, swept fine past leg slip, sparked massive celebrations across the country, capping a historic comeback from initial series losses.</p>`,
    author: 'Mike Ross',
    authorAvatar: 'https://picsum.photos/seed/author_mike/100/100',
    time: '10 min ago',
    timestamp: Date.now() - 10 * 60 * 1000,
    views: '350.5K',
    image: 'https://picsum.photos/seed/sport1/800/450',
    trendingScore: 100,
    isBreaking: true
  },
  {
    id: 42,
    category: 'Sports',
    title: 'Teenage Tennis Prodigy Claims Maiden Grand Slam in Direct-set Overwhelming Victory',
    excerpt: 'At just seventeen years old, the unseeded qualifier showcased surgical baseline volleys to defeat the reigning champion, marking the dawn of a new era in professional court play.',
    body: `<p>Seventeen-year-old Anya Kovac has become the youngest Grand Slam champion in nearly three decades by defeating the world’s top-ranked player 6-3, 6-4 in the final of the women’s singles. Playing as an unseeded wild-card qualifier, her surgical, high-velocity baseline drives and flawless service games completely disrupted her opponent’s baseline game.</p>
           <p>Sporting journalists have called her tournament run the most impressive display of focus and strategic maturity in the modern tennis era.</p>`,
    author: 'Roger Forrest',
    time: '4 hours ago',
    timestamp: Date.now() - 4 * 60 * 60 * 1000,
    views: '115.8K',
    image: 'https://picsum.photos/seed/sport2/600/400',
    trendingScore: 91
  },
  {
    id: 43,
    category: 'Sports',
    title: 'Underdog FC Recovers from 3-Goal Slot to Lift National Championship Cup',
    excerpt: 'The crowd erupted in absolute disbelief as consecutive tactical standard substitutions yielded three stunning second-half finishes, before wrapping the tournament in a penalty shootout.',
    body: `<p>Underdog Football Club secured their maiden national club title today in a dramatic match that will be remembered for generations. Trailing 3-0 at halftime, the manager executed key structural and wing tactics, leading to a spectacular three-goal second-half blitz.</p>
           <p>The match progressed to a highly intense penalty shootout, where a brilliant diving block by the backup goalkeeper sealed the historic trophy.</p>`,
    author: 'Sandeep Sharma',
    time: '7 hours ago',
    timestamp: Date.now() - 7 * 60 * 60 * 1000,
    views: '94.2K',
    image: 'https://picsum.photos/seed/sport3/600/400',
    trendingScore: 84
  },
  {
    id: 44,
    category: 'Sports',
    title: 'Double Gold Performance: Chess Grandmasters Clean-Sweep International Olympiad',
    excerpt: 'Both men and women elite squads dominated final rounds with pristine opening prep and masterful endgame techniques, making this our most comprehensive chess triumph in history.',
    body: `<p>India’s chess contingents have created historic records at the International Chess Olympiad by securing double gold medals across both the Men’s and Women’s divisions. Navigating intense final rounds against high-tier teams, the elite grandmasters used flawless tactical prep and precise endgame time management to secure critical wins.</p>
           <p>The chess federations celebrated the outcome, describing it as an absolute validation of the massive chess development academies active across the sub-continent.</p>`,
    author: 'Nisha Sundaram',
    time: '22 hours ago',
    timestamp: Date.now() - 22 * 60 * 60 * 1000,
    views: '73.0K',
    image: 'https://picsum.photos/seed/sport4/600/400',
    trendingScore: 79
  },
  {
    id: 45,
    category: 'Sports',
    title: 'Olympic Committee Formally Announces Dynamic Integration of Five New High-Speed Digital Disciplines',
    excerpt: 'Featuring competitive e-sports simulations, robotic drone racing leagues, and indoor athletic trials, the additions represent a major youth alignment shift.',
    body: `<p>The International Olympic Committee (IOC) has finalized the inclusion of five innovative tech-integrated sports disciplines for the next Summer Games. The list features premium autonomous drone pilot racing, virtual off-road cycling, and synchronized precision acrobatics.</p>
           <p>The IOC declared that these high-speed additions safely integrate youth interest with traditional athletic endurance benchmarks.</p>`,
    author: 'David Hasselbeck',
    time: '1 day ago',
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    views: '54.2K',
    image: 'https://picsum.photos/seed/sport5/600/400',
    trendingScore: 82
  },
  {
    id: 46,
    category: 'Sports',
    title: 'High-Altitude Cycling Championship Commences Across Legendary Himalayan Passes',
    excerpt: 'Over 150 elite global cyclists tackle extreme thin-air mountain routes, testing metabolic capacities under intense horizontal elevations.',
    body: `<p>The annual Himalayan Ultra Bike Challenge flagged off from Leh, tasking international cyclists with navigating 500 kilometers of high-altitude paths, climbing past 18,000 feet over rugged roads.</p>
           <p>Support trucks carrying remote oxygen stations accompany the group, ensuring participant safety as they push human cardiovascular boundaries.</p>`,
    author: 'Sonam Norbu',
    time: '1 day ago',
    timestamp: Date.now() - 28 * 60 * 60 * 1000,
    views: '35.9K',
    image: 'https://picsum.photos/seed/sport6/600/400',
    trendingScore: 71
  },
  {
    id: 47,
    category: 'Sports',
    title: 'Premium Yachting Regatta Sets Sail from West Coast Ports Across Indian Ocean Channels',
    excerpt: 'Dozens of state-of-the-art carbon-fiber hulls battle intense maritime wind streams in a high-speed three-hundred-mile oceanic speed trial.',
    body: `<p>Spectators gathered at the terminal ports of Mumbai to witness the start of the Indian Ocean Speed Cup. The race integrates high-speed yachting engineering with complex ocean navigation, demanding continuous adjustments to sailboat shapes to match intense maritime currents.</p>
           <p>The yachting federations have deployed tracking sensors to stream high-definition real-time sails telemetry to viewers worldwide.</p>`,
    author: 'Capt. Aditya Rao',
    time: '2 days ago',
    timestamp: Date.now() - 48 * 60 * 60 * 1000,
    views: '41.5K',
    image: 'https://picsum.photos/seed/sport7/600/400',
    trendingScore: 68
  },
  {
    id: 48,
    category: 'Sports',
    title: 'National Sports Authority Unveils High-Performance Training Arenas in Five Regional Capitals',
    excerpt: 'Armed with advanced motion acquisition suites, metabolic oxygen analytics, and synthetic turf pitches, the hubs target fostering raw Olympic talent.',
    body: `<p>The Sports Authority has finalized five state-of-the-art regional high-performance sports academies. The facilities feature high-speed optical motion-tracking cameras, allowing coaches to map body postures and joint dynamics with absolute pixel precision.</p>
           <p>The centers offer local athletic prospects free, complete access to elite physiotherapy and professional performance-coaching programs.</p>`,
    author: 'Rohan Dev',
    time: '2 days ago',
    timestamp: Date.now() - 54 * 60 * 60 * 1000,
    views: '61.4K',
    image: 'https://picsum.photos/seed/sport8/600/400',
    trendingScore: 78
  },
  {
    id: 49,
    category: 'Sports',
    title: 'Archery Elite Squad Clinches Sweeping Gold Collection at World Championships',
    excerpt: 'India’s compound bow competitors secured a clean sweep of top ranks in Berlin, showcasing outstanding visual composure inside gusty wind conditions.',
    body: `<p>India’s archery team has recorded its most dominant international display, winning four gold medals at the World Archery Championship. Under gusty cross-wind conditions that baffled other shooters, the squad maintained a superb grouping, hitting perfect center rings during key shootout rounds.</p>
           <p>The team attributed their victory to specialized visual focus exercises conducted inside advanced mock wind chambers ahead of the trip.</p>`,
    author: 'Tarun Deep',
    time: '3 days ago',
    timestamp: Date.now() - 72 * 60 * 60 * 1000,
    views: '48.9K',
    image: 'https://picsum.photos/seed/sport9/600/400',
    trendingScore: 83
  },
  {
    id: 50,
    category: 'Sports',
    title: 'Athletics Sprint Legend Reaches Podium Center in Final Historic Career Performance',
    excerpt: 'Announcing formal retirement, the decorated sprinter clocks an incredible sub-ten-second finish to lift the international title.',
    body: `<p>The fastest individual in the region has closed an incredible sports journey by winning the 100m sprint gold today. Crossing the finish line at 9.88 seconds, the athlete secured a gold medal before receiving an emotional standing ovation from fifty-thousand fans in the arena.</p>
           <p>The track star plans to dedicate their retirement to building elite athletic training programs for rural kids, passing on their training techniques.</p>`,
    author: 'Sarah Jenkins',
    time: '3 days ago',
    timestamp: Date.now() - 84 * 60 * 60 * 1000,
    views: '112.5K',
    image: 'https://picsum.photos/seed/sport10/600/400',
    trendingScore: 94
  },

  // ==================== ENTERTAINMENT (10 Articles) ====================
  {
    id: 51,
    category: 'Entertainment',
    title: 'Acclaimed Director Christopher Nolan Announces Cinematic Return to Space Epic Genre',
    excerpt: 'Confirming high-budget pre-production, the visionary director revealed the film revolves around spatial time dilution anomalies and will rely exclusively on analog IMAX cameras.',
    body: `<p>The cinematic world was set ablaze today as representatives for Christopher Nolan verified his next massive directorial venture. The script—tentatively titled "Gravity Wave Accord"—revolves around quantum gravitational anomalies that cause temporal shift events in crewed exploration teams.</p>
           <p>True to his traditional visual philosophy, Nolan has secured custom analog 15/70mm IMAX cameras and will rely entirely on massive mechanical gymbals and physical models, bypassing green screen digital overlays completely.</p>`,
    author: 'Emma Watson',
    authorAvatar: 'https://picsum.photos/seed/author_emma/100/100',
    time: '3 hours ago',
    timestamp: Date.now() - 3 * 60 * 60 * 1000,
    views: '88.5K',
    image: 'https://picsum.photos/seed/ent1/600/400',
    trendingScore: 89
  },
  {
    id: 52,
    category: 'Entertainment',
    title: 'Pop Megastar Launches Unannounced Album, Shattering Global Streaming Figures',
    excerpt: 'Surprising fans worldwide at midnight, the raw acoustic-synth tracks logged over two hundred million streams on day one, completely overwhelming playlist servers.',
    body: `<p>In an unprecedented surprise launch, pop icon Clara Vance dropped her ninth studio album, "Luminescence," at midnight without any prior marketing teasers. Incorporating warm synth-pop beats paired with raw, acoustic strings, the album became an instant social phenomenon, Logging over two hundred million stream runs within twelve hours.</p>
           <p>Music analysts praised the album's analog vocal tracks, declaring it an intentional and refreshing return to real acoustic songwriting in a market crowded with synthetic beats.</p>`,
    author: 'Tanya Sen',
    time: '6 hours ago',
    timestamp: Date.now() - 6 * 60 * 60 * 1000,
    views: '450.0K',
    image: 'https://picsum.photos/seed/ent2/600/400',
    trendingScore: 97
  },
  {
    id: 53,
    category: 'Entertainment',
    title: 'Boutique Regional Film Receives Massive 10-Minute Standing Ovation at Cannes',
    excerpt: 'Shot on a shoestring budget across high villages, the deeply moving father-daughter drama was acquired by international distributors immediately following its theater showcase.',
    body: `<p>A shoestring-budget Indian film, "Clay & Echoes," became the sensation of the Cannes Film Festival today, capturing a rare ten-minute standing ovation at the terminal showcase. Tracing the quiet life of an elderly potter and his daughter in a remote village, the movie is celebrated as a visual masterpiece of acting and lighting.</p>
           <p>Two major global distribution networks acquired the theatrical screening rights within hours of the show, guaranteeing a global launch for the regional project.</p>`,
    author: 'Jean-Pierre',
    time: '14 hours ago',
    timestamp: Date.now() - 14 * 60 * 60 * 1000,
    views: '41.3K',
    image: 'https://picsum.photos/seed/ent3/600/400',
    trendingScore: 80
  },
  {
    id: 54,
    category: 'Entertainment',
    title: 'Immersive Concert Ecosystems Drive Live Theater Bookings on Spatial Upgrades',
    excerpt: 'By blending virtual headsets with physical stage effects, touring musicians can place remote fans directly onto the main platform, creating secondary commercial avenues.',
    body: `<p>Live performance networks are redefining concert experiences by deploying immersive 360-degree spatial production systems. remote ticket buyers using advanced VR setups can position themselves directly next to their favorite musicians on stage, complete with synced ambient lighting and physical haptic floors.</p>
           <p>Touring groups suggest these virtual systems allow them to double ticket limits safely, maximizing financial returns while keeping ticket prices accessible.</p>`,
    author: 'Marcus Cole',
    time: '1 day ago',
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    views: '31.1K',
    image: 'https://picsum.photos/seed/ent4/600/400',
    trendingScore: 60
  },
  {
    id: 55,
    category: 'Entertainment',
    title: 'Bollywood Veteran Superstar Cast as Leading Character in High-Budget Global Sci-Fi Series',
    excerpt: 'Marking a major cross-cultural landmark, the seasoned actor joins the franchise as a brilliant stellar system engineer.',
    body: `<p>An eminent Bollywood superstar has officially signed on to join the massive spatial sci-fi epic "Cosmic Horizon." Casting directors stated the veteran actor's rich theatrical maturity and screen presence made them the absolute fit for the complex role of a stellar system builder.</p>
           <p>The development highlights the expanding influence of Indian talent in global cinematic projects, uniting audiences across cinema traditions.</p>`,
    author: 'Karan Johal',
    time: '1 day ago',
    timestamp: Date.now() - 28 * 60 * 60 * 1000,
    views: '184.2K',
    image: 'https://picsum.photos/seed/ent5/600/400',
    trendingScore: 92
  },
  {
    id: 56,
    category: 'Entertainment',
    title: 'Leading OTT Platforms Form Historic Alliance to Standardize Spatial Audio Playback',
    excerpt: 'The unified codec guarantees high-fidelity audio streams for home theaters and headsets without requiring heavy bandwidth usage.',
    body: `<p>In a major boost to home entertainment, four competitive streaming networks have partnered to deploy the AstroSound audio codec. The technology delivers high-fidelity spatial audio profiles without demanding heavy internet bandwidth.</p>
           <p>Consumer feedback has been highly positive, with viewers celebrating the theatrical sound quality delivered on modest home devices.</p>`,
    author: 'Rajiv Malhotra',
    time: '2 days ago',
    timestamp: Date.now() - 48 * 60 * 60 * 1000,
    views: '45.1K',
    image: 'https://picsum.photos/seed/ent6/600/400',
    trendingScore: 78
  },
  {
    id: 57,
    category: 'Entertainment',
    title: 'Historical Drama Masterpiece Sweeps Over Twelve Nominations at National Awards',
    excerpt: 'Tracing the complex lives of regional freedom fighters, the epic holds top slots for cinematic design, screenplay, and direction.',
    body: `<p>The historical cinematic epic "Pratigya" has swept the National Film Award nominations. Celebrated for its historically faithful set designs and accurate costume choices, the project holds twelve top-tier nominations, including Best Picture, Best Actor, and Best Cinematography.</p>
           <p>Scholars praised the film's screenplay for highlighting overlooked accounts and real-life logs of historical freedom fighters.</p>`,
    author: 'Harish Shankar',
    time: '2 days ago',
    timestamp: Date.now() - 54 * 60 * 60 * 1000,
    views: '92.3K',
    image: 'https://picsum.photos/seed/ent7/600/400',
    trendingScore: 85
  },
  {
    id: 58,
    category: 'Entertainment',
    title: 'Indian Folk Fusion Band Nominated for Premium Global Music Achievement Award',
    excerpt: 'Blending traditional wooden flutes, local clay pots, and classical violins, the group’s album records millions of global playlist streams.',
    body: `<p>A magical folk fusion band, "Swara & Strings," has secured a prestigious international music prize nomination. Their acoustic album records millions of streams, blending traditional Indian regional instruments with classical chords and syncopated keys.</p>
           <p>Music historians lauded the band for maintaining authentic musical heritages while building beautiful, accessible cross-cultural styles.</p>`,
    author: 'Vikram Sethi',
    time: '3 days ago',
    timestamp: Date.now() - 72 * 60 * 60 * 1000,
    views: '39.8K',
    image: 'https://picsum.photos/seed/ent8/600/400',
    trendingScore: 81
  },
  {
    id: 59,
    category: 'Entertainment',
    title: 'Interactive Virtual Reality Cinematic Series Launches on Major Gaming Playstores',
    excerpt: 'The adventure allows players to guide the story, stepping inside highly detailed historical settings with stunning spatial fidelity.',
    body: `<p>A collaborative studio project has launched "The Echo Chambers," a cinematic interactive VR adventure. Viewers put on VR headsets to step inside a highly detailed, simulated 1920s metropolis, resolving mysteries by interacting directly with characters and physical items.</p>
           <p>The software represents a new era in storytelling, blending narrative pacing with immersive virtual reality mechanics.</p>`,
    author: 'Aria Sterling',
    time: '3 days ago',
    timestamp: Date.now() - 84 * 60 * 60 * 1000,
    views: '31.5K',
    image: 'https://picsum.photos/seed/ent9/600/400',
    trendingScore: 72
  },
  {
    id: 60,
    category: 'Entertainment',
    title: 'Indian Classical Dance Academy Partners with Tech Group for Motion Capture Digitization',
    excerpt: 'Attaching laser trackers to veteran dancers, key physical sequences are cataloged in 3D to guide future generations.',
    body: `<p>A leading classical dance academy has launched a digital preservation project. By attaching professional motion-capture tracking nodes to master performers, the physical steps and postures of classical dance styles are captured in precise 3D.</p>
           <p>The resulting 3D models will guide future student squads, preserving fragile physical heritages with absolute precision.</p>`,
    author: 'Nandini Sen',
    time: '4 days ago',
    timestamp: Date.now() - 96 * 60 * 60 * 1000,
    views: '24.9K',
    image: 'https://picsum.photos/seed/ent10/600/400',
    trendingScore: 68
  },

  // ==================== AUTO (10 Articles) ====================
  {
    id: 61,
    category: 'Auto',
    title: 'Tata Curvv EV Redefines Premium Coupe-SUV Space with Generous Driving Range',
    excerpt: 'Blending high-level aerodynamic silhouettes with heavy lithium pouch batteries, the brand new offering establishes competitive utility scores for daily long commutes and fast-charging capabilities.',
    body: `<p>In what is being labeled as a major watershed moment for the Indian electric automotive market, Tata Motors has launched the complete production edition of the Curvv EV. Sporting a spectacular aerodynamic fastback coupe profile, the vehicle cuts drag coefficients down to an exceptional 0.22, significantly minimizing high-speed drag and optimizing energy extraction from its 55 kWh liquid-cooled battery pack.</p>
           <p>Key technical specifications of the Curvv EV include:</p>
           <ul>
             <li><strong>Certified Driving Range:</strong> Over 585 kilometers on a single charge under ARAI testing conditions.</li>
             <li><strong>High-Speed DC charging:</strong> Replenishing from ten to eighty percent in twenty-four minutes using 120kW chargers.</li>
             <li><strong>Intelligent Infotainment Sync:</strong> Multi-screen digital cockpit with real-time solar route predictions and ADAS safety parameters standard.</li>
           </ul>
           <p>Automobile reviewers have praised the suspension dynamics and quiet interior ride, remarking that the Curvv EV brings high SUV style and premium electric dynamics down to highly compelling public budgets.</p>`,
    author: 'Ranveer Singh',
    authorAvatar: 'https://picsum.photos/seed/author_ranveer/100/100',
    time: '45 min ago',
    timestamp: Date.now() - 45 * 60 * 1000,
    views: '38.5K',
    image: 'https://picsum.photos/seed/auto1/600/400',
    specs: '⚡ Electric | ₹18.5L',
    rating: 4.8,
    trendingScore: 94
  },
  {
    id: 62,
    category: 'Auto',
    title: 'Rugged Off-Roader Secures Top-Tier 5-Star Rating in Global Safety Crash Assessment',
    excerpt: 'Featuring high-tensile passenger cage struts and multiple dual-stage side impact curtains as standard, the off-road platform proved remarkably resilient during high-impact structural testing.',
    body: `<p>A flagship Indian off-roader has secured a historic 5-star crash safety score in the newly updated, highly rigorous Global NCAP safety assessments. The SUV model recorded perfect scores for adult occupant protection and logged outstanding ratings for children, thanks to its high-tensile steel frame.</p>
           <p>Equipped with dual-stage front airbag systems, electronic stability control, and side-curtain barriers, the off-road chassis remains structurally intact even under severe rollover assessments.</p>`,
    author: 'Kabir Dev',
    time: '5 hours ago',
    timestamp: Date.now() - 5 * 60 * 60 * 1000,
    views: '54.2K',
    image: 'https://picsum.photos/seed/auto2/600/400',
    specs: '🌿 Diesel 4x4 | ₹15.2L',
    rating: 4.9,
    trendingScore: 86
  },
  {
    id: 63,
    category: 'Auto',
    title: 'Futuristic Electric Sedan Clinches World Car Design of the Year with Seamless Profile',
    excerpt: 'Judges praised the vehicles aerodynamic coefficient of 0.20, stating its unified glass dome cabin and recycled sustainable interiors represent the peak of next-era mobility.',
    body: `<p>The Aerodynamic-X electric sedan has officially captured the World Car Design Award at the international automobile summit in Tokyo. The unified glass dome cabin design channels air around the front tracks, lowering thermal losses and battery drain at speed.</p>
           <p>The interior spaces are constructed entirely of plant-derived fibers and ocean-bound plastics, proving that luxury mobility can align with absolute zero-waste standards.</p>`,
    author: 'Kenji Tanaka',
    time: '9 hours ago',
    timestamp: Date.now() - 9 * 60 * 60 * 1000,
    views: '28.9K',
    image: 'https://picsum.photos/seed/auto3/600/400',
    specs: '🔋 Long Range | ₹65.0L',
    rating: 4.7,
    trendingScore: 78
  },
  {
    id: 64,
    category: 'Auto',
    title: 'Smart Hybrid City Hatchback Logs Record 32 km/l Economy Figures in Real Urban Trials',
    excerpt: 'Utilizing intelligent motor assists that disengage fuel lines completely during high idle stop periods, the compact vehicle achieves unprecedented tank range figures in congested metropolis areas.',
    body: `<p>The newly unveiled hybrid city hatchback has stunned reviewers by logging 32.4 kilometers per liter of gasoline in real-world urban tests. The vehicle uses intelligent electric motor assists that disengage the internal combustion cylinder entirely during slow-speed crawls and gridlock stops.</p>
           <p>Commuters can navigate standard office drives on electric battery power alone, keeping fuel costs extremely low.</p>`,
    author: 'Amit Bhalla',
    time: '16 hours ago',
    timestamp: Date.now() - 16 * 60 * 60 * 1000,
    views: '19.4K',
    image: 'https://picsum.photos/seed/auto4/600/400',
    specs: '⛽ Smart Hybrid | ₹8.2L',
    rating: 4.5,
    trendingScore: 72
  },
  {
    id: 65,
    category: 'Auto',
    title: 'Premium Indian Motorcycle Brand Unveils Advanced Electric Cruiser with Retro Silhouette',
    excerpt: 'Blending iconic 1970s frame aesthetics with a modern 15kW battery belt drive, the cruiser offers silent, stylish metropolitan touring.',
    body: `<p>A legendary Indian motorcycle cruiser manufacturer has revealed the Electracycle. Combining an iconic retro double-cradle frame with a highly modern 15kW mid-drive motor, the bike delivers silent, instantaneous torque through a quiet carbon-fiber belt drive.</p>
           <p>The bike targets urban cruiser enthusiasts, offering a comfortable 200km range under a classic leather saddle and shiny chrome details.</p>`,
    author: 'Siddharth Roy',
    time: '1 day ago',
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    views: '45.1K',
    image: 'https://picsum.photos/seed/auto5/600/400',
    specs: '🏍️ cruiser | ₹2.9L',
    rating: 4.8,
    trendingScore: 89
  },
  {
    id: 66,
    category: 'Auto',
    title: 'High-Payload Electric Freight Trucks Join National Infrastructure Logistics Fleets',
    excerpt: 'Featuring intelligent multi-axle electric drives, the newly inducted semi-trucks tackle mountain passes with heavy trade cargos easily.',
    body: `<p>National logistics conglomerates have announced the induction of 50 heavy-duty pure-electric semi-trailer trucks. The multi-axle electric rigs generate intense torque, allowing them to haul forty-ton construction items up steep mountain passes without heating issues.</p>
           <p>The shipping firms verified that swapping heavy diesel engines with electric drives lowers fleet upkeep costs by nearly thirty percent.</p>`,
    author: 'Vikash Jain',
    time: '1 day ago',
    timestamp: Date.now() - 30 * 60 * 60 * 1000,
    views: '29.9K',
    image: 'https://picsum.photos/seed/auto6/600/400',
    specs: '🚛 Heavy Truck | ₹1.2Cr',
    rating: 4.6,
    trendingScore: 71
  },
  {
    id: 67,
    category: 'Auto',
    title: 'Retro Roadster Reimagined with Sophisticated Hydro-Oxygen Multi-Fuel Combustion Engine',
    excerpt: 'An automotive tech group showcases a classic sports model that runs on clean liquid hydrogen, emitting only pure water vapor.',
    body: `<p>An engineering collective has built a historic roadster prototype equipped with a multi-fuel engine. The engine burns liquid hydrogen fuel, outputting zero carbon or particulate emissions and leaving only steam in the exhaust pipe.</p>
           <p>Reviewers stated the prototype retains the classic, raw exhausts note and mechanical feel loved by roadster fans worldwide.</p>`,
    author: 'Karl Becker',
    time: '2 days ago',
    timestamp: Date.now() - 48 * 60 * 60 * 1000,
    views: '58.4K',
    image: 'https://picsum.photos/seed/auto7/600/400',
    specs: '🏎️ Hydrogen | Concept',
    rating: 4.9,
    trendingScore: 92
  },
  {
    id: 68,
    category: 'Auto',
    title: 'Advanced Driver-Assist Systems (ADAS) Certified as Standard Core Across Affordable Hatchbacks',
    excerpt: 'State safety boards regulate active brake assist, lane sensors, and radar blind-spot alerts as standard baseline additions.',
    body: `<p>In a major boost to public travel safety, safety regulators have mandated that all passenger vehicles must carry active ADAS safety systems. Auto builders are launching entry-level hatchbacks complete with radar-guided automatic emergency braking and active lane warnings.</p>
           <p>The safety features are expected to slash highway rear-end collisions by nearly thirty-five percent across regional routes.</p>`,
    author: 'Arun Bhatia',
    time: '2 days ago',
    timestamp: Date.now() - 54 * 60 * 60 * 1000,
    views: '32.1K',
    image: 'https://picsum.photos/seed/auto8/600/400',
    specs: '🚗 ADAS Standard | ₹6.5L',
    rating: 4.7,
    trendingScore: 80
  },
  {
    id: 69,
    category: 'Auto',
    title: 'Sports Coupe Concept Blends Recycled Carbon Lattices with Solar Cells',
    excerpt: 'Designed with ultra-thin organic solar film arrays, the vehicle generates secondary battery charges dynamically when parked.',
    body: `<p>The Solar-Coupe design study uses light-weight composite carbon fibers sourced from recycled wind turbine panels. The vehicle’s outer surface is coated with high-efficiency flexible micro-solar cells that trickle charges back into battery packs when parked under ambient sunlight.</p>
           <p>The concept showcases how future vehicles can actively replenish energy reserves autonomously, bypassing standard wall outlets on daily short runs.</p>`,
    author: 'Luc Dubois',
    time: '3 days ago',
    timestamp: Date.now() - 72 * 60 * 60 * 1000,
    views: '22.4K',
    image: 'https://picsum.photos/seed/auto9/600/400',
    specs: '🏎️ Solar Coupe | Prototype',
    rating: 4.8,
    trendingScore: 75
  },
  {
    id: 70,
    category: 'Auto',
    title: 'Hydrogen Fuel-Cell Passenger Buses Enter Commercial Trial Runs in Urban Corridors',
    excerpt: 'The silent transit fleets complete test routes safely, using hydrogen cells to generate electricity with pure water emissions.',
    body: `<p>A metropolitan transport group has rolled out ten emission-free hydrogen cell passenger buses. The electric motor setups generate power by combining compressed hydrogen gas with atmospheric oxygen, discharging only distilled water vapor.</p>
           <p>The clean buses run for 600 kilometers under a single six-minute chemical tank refill, proving highly suitable for busy urban schedules.</p>`,
    author: 'Rajesh Sharma',
    time: '3 days ago',
    timestamp: Date.now() - 84 * 60 * 60 * 1000,
    views: '41.0K',
    image: 'https://picsum.photos/seed/auto10/600/400',
    specs: '🚌 Hydro Bus | Trials',
    rating: 4.6,
    trendingScore: 82
  },

  // ==================== OPINION & COLUMNS (3 Articles) ====================
  {
    id: 71,
    category: 'Opinion',
    title: 'The Ethics of Generative AI: Designing a Safe and Transparent Future for All',
    excerpt: 'Are algorithms serving as helpers or silent filters? We explore the deep societal shifts of automation and why human authors must retain final oversight of global communication structures.',
    body: `<p>Are algorithms serving as helpers or silent filters? We explore the deep societal shifts of automation and why human authors must retain final oversight of global communication structures.</p>
           <p>Generative tools are useful instruments, but human creativity remains the heart of authorship. If we surrender the ink, we surrender the soul.</p>`,
    author: 'Dr. Arvinda Sen',
    authorAvatar: 'https://picsum.photos/seed/avatar1/150/150',
    time: '2 hours ago',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    views: '74.2K',
    image: 'https://picsum.photos/seed/opinion1/600/400',
    quote: 'Generative tools are useful instruments, but human creativity remains the heart of authorship. If we surrender the ink, we surrender the soul.',
    trendingScore: 91
  },
  {
    id: 72,
    category: 'Opinion',
    title: 'Decentralized Capital: Reimagining Global Inclusion Outside Major Intermediary Walls',
    excerpt: 'Traditional banking infrastructures struggle to service regional remote builders. Real borderless micro-capital integration requires open-source ledger frameworks structured around utility, not speculation.',
    body: `<p>Traditional banking infrastructures struggle to service regional remote builders. Real borderless micro-capital integration requires open-source ledger frameworks structured around utility, not speculation.</p>
           <p>Financial inclusion cannot wait for legacy approvals. Pure, transparent smart contracts democratize economic leverage directly down to keyboard builders.</p>`,
    author: 'Rajesh Nair',
    authorAvatar: 'https://picsum.photos/seed/avatar2/150/150',
    time: '5 hours ago',
    timestamp: Date.now() - 5 * 60 * 60 * 1000,
    views: '35.1K',
    image: 'https://picsum.photos/seed/opinion2/600/400',
    quote: 'Financial inclusion cannot wait for legacy approvals. Pure, transparent smart contracts democratize economic leverage directly down to keyboard builders.',
    trendingScore: 82
  },
  {
    id: 73,
    category: 'Opinion',
    title: 'Is True Digital Detoxing Possible in an Era of Infinite Remote-Work Pingboards?',
    excerpt: 'The psychological trade-off of remote schedules is turning residences into physical servers. We propose tactile offline practices to guard mental margins from constant virtual team notifications.',
    body: `<p>The psychological trade-off of remote schedules is turning residences into physical servers. We propose tactile offline practices to guard mental margins from constant virtual team notifications.</p>
           <p>We traded regional commutes for endless virtual pings, creating home-offices without walls. To disconnect, we must physically master boundary thresholds.</p>`,
    author: 'Priya Sharma',
    authorAvatar: 'https://picsum.photos/seed/avatar3/150/150',
    time: '10 hours ago',
    timestamp: Date.now() - 10 * 60 * 60 * 1000,
    views: '58.9K',
    image: 'https://picsum.photos/seed/opinion3/600/400',
    quote: 'We traded regional commutes for endless virtual pings, creating home-offices without walls. To disconnect, we must physically master boundary thresholds.',
    trendingScore: 87
  },

  // ==================== VIDEOS (4 Articles) ====================
  {
    id: 74,
    category: 'Video',
    title: 'Ground Report: Deep-Sea Diving inside the Remarkable Ruins of the Ancient Mediterranean Citadel',
    excerpt: 'Equipped with underwater remote cameras, our production team captures stunning columns and pristine artifacts preserved deep within ocean beds.',
    body: `<p>Equipped with underwater remote cameras, our production team captures stunning columns and pristine artifacts preserved deep within ocean beds.</p>`,
    author: 'Production Team',
    time: '1 hour ago',
    timestamp: Date.now() - 60 * 60 * 1000,
    views: '340K',
    image: 'https://picsum.photos/seed/video1/600/400',
    duration: '12:15',
    trendingScore: 93,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 75,
    category: 'Video',
    title: 'Exclusive High-Speed Cabin Walkthrough of Indias Upcoming Next-Generation Bullet Train System',
    excerpt: 'Take a high-definition first-look seat inside the aerodynamic cockpit as locomotive engineers conduct speed-barrier validation trials.',
    body: `<p>Take a high-definition first-look seat inside the aerodynamic cockpit as locomotive engineers conduct speed-barrier validation trials.</p>`,
    author: 'Railway Directs',
    time: '6 hours ago',
    timestamp: Date.now() - 6 * 60 * 60 * 1000,
    views: '1.2M',
    image: 'https://picsum.photos/seed/video2/600/400',
    duration: '08:45',
    trendingScore: 99,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 76,
    category: 'Video',
    title: 'Visual Analysis: Retracing the Dramatic Turnaround of the Historic Border-Gavaskar Final Over',
    excerpt: 'Our sports analyst highlights the exact shift in pitch delivery lines and fielding layouts that sealed the tournament victory.',
    body: `<p>Our sports analyst highlights the exact shift in pitch delivery lines and fielding layouts that sealed the tournament victory.</p>`,
    author: 'Sports Desk',
    time: '12 hours ago',
    timestamp: Date.now() - 12 * 60 * 60 * 1000,
    views: '850K',
    image: 'https://picsum.photos/seed/video3/600/400',
    duration: '15:30',
    trendingScore: 95,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 77,
    category: 'Video',
    title: 'Behind the Scenes: Crafting the Gravity-Dilution Analog Sets of Nolans Spatial Drama',
    excerpt: 'Learn why the production opted for giant physical rotating gymbal chambers rather than green-screens to portray gravity differentials.',
    body: `<p>Learn why the production opted for giant physical rotating gymbal chambers rather than green-screens to portray gravity differentials.</p>`,
    author: 'Filmmaker Insights',
    time: '1 day ago',
    timestamp: Date.now() - 24 * 60 * 60 * 1000,
    views: '450K',
    image: 'https://picsum.photos/seed/video4/600/400',
    duration: '10:20',
    trendingScore: 85,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    id: 78,
    category: 'Sports',
    title: 'RR vs MI: Rajasthan Royals Must Win Today to Stay Alive in IPL 2025 Playoffs Race',
    excerpt: 'With their playoff hopes hanging by a thread, Rajasthan Royals face a must-win clash against Mumbai Indians tonight. All eyes on teenage sensation Vaibhav Suryavanshi to deliver the magic.',
    body: `<p>Tonight's IPL 2025 encounter between <strong>Rajasthan Royals (RR)</strong> and <strong>Mumbai Indians (MI)</strong> is nothing short of a knockout for the Royals. A defeat tonight will all but end their chances of making the top four, making this game a <em>must-win</em> for the Jaipur-based franchise.</p>
           <blockquote class="my-6 bg-zinc-50 dark:bg-zinc-950/60 p-5 rounded-2xl border-l-4 border-l-brand-crimson dark:border-l-red-500 italic text-zinc-900 dark:text-zinc-100 font-bold shadow-sm">
             "Rajasthan Royals ko aaj jeetna hi hoga — playoffs ka rasta issi match se guzarta hai."
           </blockquote>
           <p>The spotlight will fall heavily on <strong>Vaibhav Suryavanshi</strong>, the 14-year-old prodigy from Bihar who became IPL's youngest-ever centurion this season with a blistering <strong>101 off just 38 balls</strong> against Gujarat Titans. His explosive power-play batting has been a revelation, and RR will desperately need him to fire at the top of the order.</p>
           <p>Mumbai Indians, on the other hand, come into this game with confidence riding high, bolstered by their seasoned bowling attack. The dew factor and pitch conditions at the venue are expected to favour the team batting second, adding another strategic dimension to tonight's contest.</p>
           <p><strong>Key Battle to Watch:</strong> Vaibhav Suryavanshi vs MI's pace attack in the powerplay overs. If the youngster can get going early, Rajasthan have the firepower to post a challenging total — or chase down whatever MI set.</p>
           <p>Fans across the country are glued to their screens, with the hashtag <em>#RRvsMI</em> already trending nationally. For Rajasthan Royals, this is more than just a league game — it is a battle for survival.</p>`,
    author: 'Vaibhav Suryavanshi (Image Credit)',
    authorAvatar: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vaibhav_Suryavanshi_meets_PM_Modi.jpg',
    time: 'Just now',
    timestamp: Date.now(),
    views: '1.2M',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Vaibhav_Suryavanshi_meets_PM_Modi.jpg',
    trendingScore: 100,
    isBreaking: true
  }
];

export const getCategoryColor = (category: string): string => {
  const normalized = category.toLowerCase();
  switch (normalized) {
    case 'politics':
      return 'bg-blue-600 dark:bg-blue-700 text-white';
    case 'sports':
      return 'bg-green-600 dark:bg-green-700 text-white';
    case 'technology':
    case 'tech':
      return 'bg-purple-600 dark:bg-purple-700 text-white';
    case 'world':
      return 'bg-orange-600 dark:bg-orange-700 text-white';
    case 'business':
      return 'bg-amber-600 dark:bg-amber-700 text-white';
    case 'entertainment':
      return 'bg-pink-600 dark:bg-pink-700 text-white';
    case 'auto':
      return 'bg-rose-600 dark:bg-rose-700 text-white';
    case 'opinion':
      return 'bg-teal-700 dark:bg-teal-800 text-white';
    case 'video':
      return 'bg-red-700 dark:bg-red-800 text-white';
    case 'national':
      return 'bg-cyan-600 dark:bg-cyan-700 text-white';
    case 'international':
      return 'bg-indigo-600 dark:bg-indigo-700 text-white';
    case 'health':
      return 'bg-emerald-600 dark:bg-emerald-700 text-white';
    default:
      return 'bg-zinc-600 dark:bg-zinc-750 text-white';
  }
};
