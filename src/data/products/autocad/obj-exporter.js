// OBJ Exporter for AutoCAD
// Modify this file to update product details on the webpage

export const autocadObjExporter = {
  name: 'OBJ Exporter',
  category: 'autocad',
  autodeskStoreLink: 'https://apps.autodesk.com/ACD/en/Detail/Index?id=appstore.exchange.autodesk.com:objexporter:en',
  compatibility: 'Windows 10 and Windows 11 Only',
  pluginUpdates: 'All updates for the first year are free. The plugin license is perpetual, but if it stops working after the first year and you need updates or support, you\'ll need to purchase a renewal.',
  
  features: [
    {
      title: 'High-Quality Mesh Export',
      description: 'Export 3D models with precise mesh quality control.'
    },
    {
      title: 'Material Support',
      description: 'Preserve material information in OBJ format.'
    },
    {
      title: 'Texture Mapping',
      description: 'Export UV coordinates and texture maps.'
    },
    {
      title: 'Batch Export',
      description: 'Export multiple objects simultaneously.'
    }
  ],
  
  videoUrl: 'https://www.youtube.com/embed/example-video-id-2',
  
  testimonials: [
    {
      name: 'Mike Chen',
      role: '3D Artist',
      company: 'Creative Studio',
      quote: 'OBJ Exporter makes it easy to transfer AutoCAD models to other software.',
      rating: 5
    }
  ],
  
  versionHistory: [
    {
      version: '1.5.0',
      date: '2024-01-10',
      changes: ['Enhanced material export', 'Improved texture mapping', 'Performance updates']
    },
    {
      version: '1.4.0',
      date: '2023-10-05',
      changes: ['Batch export feature', 'UI improvements']
    }
  ],
  
  faqs: [
    {
      question: 'Does it support material export?',
      answer: 'Yes, the OBJ Exporter preserves material information and supports MTL files.'
    }
  ]
};

