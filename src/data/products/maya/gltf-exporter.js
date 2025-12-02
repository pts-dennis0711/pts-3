// GLTF Exporter for Maya
// Modify this file to update product details on the webpage

export const mayaGltfExporter = {
    name: 'GLTF Exporter',
    category: 'maya',
    autodeskStoreLink: 'https://apps.autodesk.com/MAYA/en/Detail/Index?id=appstore.exchange.autodesk.com:gltfexporter:en', // Placeholder link
    downloadUrl: 'https://staging8.prototechsolutions.com/msi-softwares/GLTFExporterforMaya.msi', // Placeholder URL
    compatibility: 'Windows 10 and Windows 11 Only',
    pluginUpdates: 'All updates for the first year are free. The plugin license is perpetual, but if it stops working after the first year and you need updates or support, you\'ll need to purchase a renewal.',

    features: [
        {
            title: 'Export to GLTF/GLB',
            description: 'Export your Maya models to GLTF (JSON) or GLB (Binary) formats efficiently.'
        },
        {
            title: 'Texture Support',
            description: 'Supports export of standard materials and textures including diffuse, normal, and specular maps.'
        },
        {
            title: 'Animation Support',
            description: 'Export skeletal animations and skinning information accurately.'
        },
        {
            title: 'Geometry Optimization',
            description: 'Options to optimize geometry during export for better performance in web and AR/VR applications.'
        }
    ],

    videoUrl: '', // Add video URL if available

    testimonials: [
        {
            name: 'Alex Chen',
            role: '3D Artist',
            company: 'Game Studio X',
            quote: 'This plugin saves me hours of work. The GLTF export is clean and works perfectly with our game engine.',
            rating: 5
        },
        {
            name: 'Maria Rodriguez',
            role: 'Technical Director',
            company: 'VR Solutions',
            quote: 'Reliable and fast. The best GLTF exporter for Maya we have tested.',
            rating: 5
        }
    ],

    versionHistory: [
        {
            version: '1.0.0',
            date: '2024-05-20',
            changes: ['Initial release', 'Support for GLTF 2.0', 'Basic material support']
        }
    ],

    faqs: [
        {
            question: 'Does it support PBR materials?',
            answer: 'Yes, the plugin supports standard PBR material workflows for accurate visual representation.'
        },
        {
            question: 'Can I export animations?',
            answer: 'Yes, skeletal animations and keyframe animations are supported.'
        },
        {
            question: 'Is there a trial version?',
            answer: 'Yes, you can download a fully functional trial version to evaluate the plugin before purchasing.'
        }
    ]
};
