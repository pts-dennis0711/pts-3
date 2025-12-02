// GLTF Importer for Maya
// Modify this file to update product details on the webpage

export const mayaGltfImporter = {
    name: 'GLTF Importer',
    category: 'maya',
    autodeskStoreLink: 'https://apps.autodesk.com/MAYA/en/Detail/Index?id=appstore.exchange.autodesk.com:gltfimporter:en', // Placeholder link
    downloadUrl: 'https://staging8.prototechsolutions.com/msi-softwares/GLTFImporterforMaya.msi', // Placeholder URL
    compatibility: 'Windows 10 and Windows 11 Only',
    pluginUpdates: 'All updates for the first year are free. The plugin license is perpetual, but if it stops working after the first year and you need updates or support, you\'ll need to purchase a renewal.',

    features: [
        {
            title: 'Import GLTF/GLB',
            description: 'Import GLTF (JSON) and GLB (Binary) files directly into Maya.'
        },
        {
            title: 'Texture Import',
            description: 'Automatically imports and assigns textures including diffuse, normal, and specular maps.'
        },
        {
            title: 'Geometry Reconstruction',
            description: 'Accurately reconstructs mesh geometry, normals, and UVs from the GLTF file.'
        },
        {
            title: 'Scene Hierarchy',
            description: 'Maintains the original scene hierarchy and node structure during import.'
        }
    ],

    videoUrl: '', // Add video URL if available

    testimonials: [
        {
            name: 'David Lee',
            role: '3D Modeler',
            company: 'Creative Studios',
            quote: 'Finally a reliable GLTF importer for Maya. It handles complex models with ease.',
            rating: 5
        },
        {
            name: 'Sarah Jones',
            role: 'Pipeline TD',
            company: 'Animation Co',
            quote: 'Works great! Saves us a lot of time converting assets.',
            rating: 4
        }
    ],

    versionHistory: [
        {
            version: '1.0.0',
            date: '2024-06-01',
            changes: ['Initial release', 'Support for GLTF 2.0', 'Texture import support']
        }
    ],

    faqs: [
        {
            question: 'Does it support animation import?',
            answer: 'Currently, it supports static mesh import. Animation support is planned for future updates.'
        },
        {
            question: 'Can I import multiple files?',
            answer: 'Yes, you can batch import multiple GLTF files into your Maya scene.'
        },
        {
            question: 'Is there a trial version?',
            answer: 'Yes, a fully functional trial version is available for download.'
        }
    ]
};
