export const initialData = {
  products: [
    { id: 1, name: 'Premium Service Package', price: 299, category: 'Services', image: '🎯', description: 'Complete business solution', featured: true, features: ['Kickoff Workshop', 'Solution Blueprint', 'Roadmap'], specs: { duration: '4 weeks', support: 'Email/Chat' } },
    { id: 2, name: 'Consulting Hour', price: 99, category: 'Services', image: '💼', description: 'Expert consultation', featured: false, features: ['1:1 Session', 'Follow-up Notes'], specs: { duration: '60 mins', support: 'Email' } },
    { id: 3, name: 'Marketing Bundle', price: 499, category: 'Services', image: '📱', description: 'Full marketing suite', featured: true, features: ['Audit', 'Campaign Setup', 'Analytics'], specs: { duration: '6 weeks', support: 'Priority' } },
  ],
  blogs: [
    { 
      id: 1, 
      title: 'Revolutionizing CAD Workflows with Modern Export Plugins', 
      excerpt: 'Discover how modern export plugins are transforming CAD workflows, enabling seamless data exchange and improved collaboration across platforms.', 
      author: 'Sarah Johnson', 
      date: '2024-12-15', 
      image: '📝',
      category: 'Technology',
      readTime: '5 min read',
      content: `
        <p>In today's fast-paced engineering and design environment, the ability to seamlessly exchange CAD data between different platforms has become crucial. Modern export plugins are revolutionizing how professionals work with 3D models, enabling unprecedented levels of interoperability and collaboration.</p>
        
        <h2>The Evolution of CAD Data Exchange</h2>
        <p>Traditional CAD workflows often faced significant challenges when transferring data between different software platforms. File format incompatibilities, data loss, and geometric accuracy issues were common pain points that slowed down projects and increased costs.</p>
        
        <p>Modern export plugins address these challenges by providing robust, standardized formats that preserve geometric accuracy, metadata, and material properties. Formats like STEP, OBJ, and GLTF have become industry standards, supported by powerful export tools that ensure data integrity throughout the transfer process.</p>
        
        <h2>Key Benefits of Modern Export Solutions</h2>
        <ul>
          <li><strong>Enhanced Collaboration:</strong> Teams can work seamlessly across different CAD platforms without worrying about compatibility issues.</li>
          <li><strong>Improved Accuracy:</strong> Advanced algorithms preserve geometric precision and maintain design intent.</li>
          <li><strong>Time Savings:</strong> Automated export processes reduce manual conversion time by up to 80%.</li>
          <li><strong>Cost Reduction:</strong> Eliminate the need for multiple software licenses and reduce training requirements.</li>
        </ul>
        
        <h2>Best Practices for CAD Data Export</h2>
        <p>To maximize the benefits of modern export plugins, consider these best practices:</p>
        <ol>
          <li>Choose the right format for your use case - STEP for manufacturing, OBJ for visualization, GLTF for web applications.</li>
          <li>Verify geometric accuracy after export, especially for critical dimensions.</li>
          <li>Preserve metadata and material properties to maintain design context.</li>
          <li>Test export workflows before implementing in production environments.</li>
        </ol>
        
        <p>As the engineering and design industry continues to evolve, modern export plugins will play an increasingly important role in enabling seamless collaboration and data exchange. By adopting these tools, organizations can significantly improve their workflows and stay competitive in today's market.</p>
      `
    },
    { 
      id: 2, 
      title: 'BIM Integration: Transforming Construction Project Management', 
      excerpt: 'Explore how BIM integration is revolutionizing construction project management, improving collaboration, reducing errors, and enhancing project outcomes.', 
      author: 'Michael Chen', 
      date: '2024-12-10', 
      image: '💡',
      category: 'BIM',
      readTime: '7 min read',
      content: `
        <p>Building Information Modeling (BIM) has emerged as a transformative technology in the construction industry, fundamentally changing how projects are planned, designed, and executed. This comprehensive approach to project management integrates 3D modeling with intelligent data, creating a digital representation of physical and functional characteristics of facilities.</p>
        
        <h2>The Power of BIM Integration</h2>
        <p>BIM integration goes beyond simple 3D modeling. It creates a collaborative environment where architects, engineers, contractors, and owners can work together using a shared digital model. This model contains not just geometric information, but also data about materials, costs, schedules, and maintenance requirements.</p>
        
        <h2>Key Advantages of BIM Implementation</h2>
        <ul>
          <li><strong>Improved Collaboration:</strong> All stakeholders work from a single source of truth, reducing miscommunication and errors.</li>
          <li><strong>Enhanced Visualization:</strong> 3D models help stakeholders better understand design intent and identify potential issues early.</li>
          <li><strong>Cost Optimization:</strong> Accurate quantity takeoffs and clash detection reduce waste and rework.</li>
          <li><strong>Schedule Efficiency:</strong> Integrated scheduling tools enable better project planning and coordination.</li>
        </ul>
        
        <h2>Real-World Impact</h2>
        <p>Organizations implementing BIM integration report significant improvements in project outcomes. Studies show that BIM can reduce project costs by 20-30% and shorten project timelines by 10-15%. Additionally, the ability to detect and resolve conflicts before construction begins prevents costly on-site modifications.</p>
        
        <h2>Future of BIM</h2>
        <p>As technology continues to advance, BIM integration is evolving to include artificial intelligence, machine learning, and cloud-based collaboration platforms. These innovations promise even greater efficiency and accuracy in construction project management.</p>
      `
    },
    { 
      id: 3, 
      title: '3D Visualization: Enhancing Client Presentations and Design Reviews', 
      excerpt: 'Learn how advanced 3D visualization techniques are improving client presentations, enabling better design reviews and faster decision-making processes.', 
      author: 'Emily Rodriguez', 
      date: '2024-12-05', 
      image: '🎨',
      category: 'Visualization',
      readTime: '6 min read',
      content: `
        <p>In the world of design and engineering, the ability to effectively communicate design concepts to clients and stakeholders is crucial. Advanced 3D visualization techniques have revolutionized how professionals present their work, making it easier for non-technical audiences to understand complex designs and make informed decisions.</p>
        
        <h2>The Evolution of Design Visualization</h2>
        <p>Traditional 2D drawings and static renderings have given way to interactive 3D models, virtual reality experiences, and real-time visualization platforms. These technologies enable clients to explore designs from any angle, understand spatial relationships, and experience projects before they're built.</p>
        
        <h2>Benefits of Advanced 3D Visualization</h2>
        <ul>
          <li><strong>Improved Communication:</strong> Clients can better understand design intent and provide more informed feedback.</li>
          <li><strong>Faster Decision Making:</strong> Visual representations reduce the time needed for design approvals.</li>
          <li><strong>Error Prevention:</strong> Early visualization helps identify design issues before construction begins.</li>
          <li><strong>Marketing Advantage:</strong> Stunning visualizations help win projects and attract clients.</li>
        </ul>
        
        <h2>Modern Visualization Tools</h2>
        <p>Today's visualization tools offer unprecedented capabilities. Real-time rendering engines, cloud-based platforms, and VR/AR integration enable designers to create immersive experiences that bring projects to life. Formats like WEBGL and GLTF make it possible to share interactive 3D models directly in web browsers, eliminating the need for specialized software.</p>
        
        <h2>Best Practices</h2>
        <p>To maximize the impact of 3D visualization:</p>
        <ol>
          <li>Choose the right level of detail for your audience - technical teams need accuracy, while clients benefit from simplified, beautiful representations.</li>
          <li>Use lighting and materials strategically to highlight important design features.</li>
          <li>Provide interactive experiences that allow exploration and engagement.</li>
          <li>Combine multiple visualization techniques for comprehensive presentations.</li>
        </ol>
        
        <p>As visualization technology continues to advance, the gap between design concepts and reality continues to narrow, enabling better communication, faster approvals, and more successful projects.</p>
      `
    },
    { 
      id: 4, 
      title: 'Automation in CAD: Streamlining Repetitive Design Tasks', 
      excerpt: 'Discover how automation tools are transforming CAD workflows, reducing manual work, and enabling designers to focus on creative problem-solving.', 
      author: 'David Kim', 
      date: '2024-11-28', 
      image: '⚙️',
      category: 'Automation',
      readTime: '8 min read',
      content: `
        <p>Automation has become a game-changer in CAD workflows, enabling designers and engineers to focus on creative problem-solving rather than repetitive tasks. Modern automation tools can handle everything from routine drawing generation to complex parametric modeling.</p>
        <img src="/images/automation.webp" alt="Automation in CAD" loading="lazy" style="border-radius:16px;margin:32px 0;" />
        <h2>The Automation Revolution</h2>
        <p>CAD automation involves using scripts, macros, and specialized tools to automate repetitive design tasks. This not only saves time but also reduces errors and ensures consistency across projects. From batch processing to intelligent design generation, automation is transforming how CAD professionals work.</p>
        
        <h2>Key Automation Applications</h2>
        <ul>
          <li><strong>Batch Processing:</strong> Automate file conversions, exports, and updates across multiple projects.</li>
          <li><strong>Template Generation:</strong> Create standardized templates and drawing sets automatically.</li>
          <li><strong>Parametric Design:</strong> Use rules and constraints to generate design variations automatically.</li>
          <li><strong>Quality Checks:</strong> Automate validation and error checking processes.</li>
        </ul>
        
        <p>By implementing automation, organizations can significantly improve productivity and reduce costs while maintaining high quality standards.</p>
      `
    },
  ],
  successStories: [
    { 
      id: 1, 
      client: 'Tech Corp', 
      title: 'Increased Revenue by 300% with Streamlined CAD Workflows', 
      description: 'How we helped Tech Corp transform their CAD workflows, reducing project timelines by 40% and increasing overall productivity through advanced export plugins and automation tools.', 
      image: '🚀',
      industry: 'Manufacturing',
      challenge: 'Tech Corp was struggling with inefficient CAD data exchange processes, leading to project delays and increased costs. Their teams were spending excessive time on manual file conversions and dealing with compatibility issues between different CAD platforms.',
      solution: 'We implemented a comprehensive suite of export plugins and automation tools, enabling seamless data exchange across multiple CAD platforms. Our solution included STEP, OBJ, and GLTF exporters with automated batch processing capabilities.',
      results: [
        '300% increase in project throughput',
        '40% reduction in project timelines',
        '60% decrease in manual conversion time',
        '25% reduction in project costs'
      ],
      testimonial: {
        quote: 'ProtoTech\'s solutions transformed our entire workflow. We can now handle three times the number of projects with the same team size, and our clients are thrilled with the faster turnaround times.',
        author: 'John Smith',
        role: 'Engineering Director',
        company: 'Tech Corp'
      }
    },
    { 
      id: 2, 
      client: 'StartupX', 
      title: 'From Zero to Market Leader in 18 Months', 
      description: 'The journey of StartupX from a small startup to a market leader, powered by our BIM integration solutions and 3D visualization tools that enabled them to win major contracts and scale rapidly.', 
      image: '🎉',
      industry: 'Construction',
      challenge: 'StartupX needed to compete with established players in the construction industry but lacked the resources for expensive software licenses and training. They needed cost-effective solutions that could help them deliver professional-quality BIM services.',
      solution: 'We provided a comprehensive BIM integration platform with cloud-based collaboration tools, enabling StartupX to deliver enterprise-level services at a fraction of the cost. Our solution included automated BIM modeling, clash detection, and advanced visualization capabilities.',
      results: [
        'Won 15 major contracts in first year',
        '50% faster project delivery',
        '30% cost savings on software licenses',
        'Zero training time with intuitive interface'
      ],
      testimonial: {
        quote: 'ProtoTech gave us the tools to compete with industry giants. Their BIM solutions are intuitive, powerful, and affordable - exactly what a growing company needs.',
        author: 'Maria Garcia',
        role: 'CEO',
        company: 'StartupX'
      }
    },
    { 
      id: 3, 
      client: 'Global Engineering Solutions', 
      title: 'Reduced Design Review Time by 70% with 3D Visualization', 
      description: 'How Global Engineering Solutions transformed their client presentation process using our advanced 3D visualization tools, reducing design review cycles and accelerating project approvals.', 
      image: '🌟',
      industry: 'Engineering',
      challenge: 'Global Engineering Solutions was experiencing lengthy design review cycles, with clients struggling to understand complex 2D drawings and technical specifications. This led to multiple revision rounds and delayed project approvals.',
      solution: 'We implemented an advanced 3D visualization platform with interactive web-based viewers, enabling clients to explore designs in real-time. Our solution included WEBGL exporters, cloud-based hosting, and VR/AR integration for immersive presentations.',
      results: [
        '70% reduction in design review time',
        '90% client satisfaction improvement',
        '50% fewer revision cycles',
        '40% faster project approvals'
      ],
      testimonial: {
        quote: 'The 3D visualization tools from ProtoTech revolutionized how we present designs to clients. What used to take weeks now takes days, and our clients love being able to explore designs interactively.',
        author: 'Robert Taylor',
        role: 'Project Manager',
        company: 'Global Engineering Solutions'
      }
    },
    { 
      id: 4, 
      client: 'Architectural Design Studio', 
      title: 'Scaling Operations 5x with CAD Automation', 
      description: 'Architectural Design Studio scaled their operations fivefold without increasing staff, thanks to our CAD automation solutions that handle repetitive tasks and enable designers to focus on creativity.', 
      image: '🏗️',
      industry: 'Architecture',
      challenge: 'Architectural Design Studio was growing rapidly but couldn\'t scale their operations due to time-consuming repetitive tasks. Their designers were spending too much time on routine work instead of creative design.',
      solution: 'We developed custom automation scripts and integrated advanced CAD tools that automated template generation, drawing set creation, and quality checks. This freed up designers to focus on creative problem-solving.',
      results: [
        '5x increase in project capacity',
        '80% reduction in repetitive tasks',
        'Zero increase in staff size',
        'Improved design quality and creativity'
      ],
      testimonial: {
        quote: 'ProtoTech\'s automation solutions allowed us to scale our business dramatically without hiring more staff. Our designers are now free to focus on what they do best - creating amazing designs.',
        author: 'Lisa Anderson',
        role: 'Principal Architect',
        company: 'Architectural Design Studio'
      }
    },
  ]
};

