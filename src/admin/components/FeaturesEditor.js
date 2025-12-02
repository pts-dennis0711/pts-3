import React from 'react';
import { Plus, X, Sparkles } from 'lucide-react';

const FeaturesEditor = ({ features = [], onChange }) => {
    const addFeature = () => {
        onChange([...features, { title: '', description: '' }]);
    };

    const removeFeature = (index) => {
        onChange(features.filter((_, i) => i !== index));
    };

    const updateFeature = (index, field, value) => {
        const updated = features.map((feature, i) =>
            i === index ? { ...feature, [field]: value } : feature
        );
        onChange(updated);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={addFeature}
                    className="btn-admin-primary flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add Feature
                </button>
            </div>

            {features.map((feature, index) => (
                <div key={index} className="glass-card p-6 border-l-4 border-purple-500">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-purple-500/10">
                                <Sparkles className="text-purple-400" size={20} />
                            </div>
                            <h4 className="text-lg font-semibold text-white">Feature {index + 1}</h4>
                        </div>
                        <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                            <input
                                type="text"
                                value={feature.title || ''}
                                onChange={(e) => updateFeature(index, 'title', e.target.value)}
                                placeholder="Feature title"
                                className="input-admin"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                            <textarea
                                value={feature.description || ''}
                                onChange={(e) => updateFeature(index, 'description', e.target.value)}
                                placeholder="Feature description"
                                rows={3}
                                className="input-admin"
                            />
                        </div>
                    </div>
                </div>
            ))}

            {features.length === 0 && (
                <div className="text-center py-12 glass-card">
                    <Sparkles className="mx-auto mb-4 text-slate-600" size={48} />
                    <p className="text-slate-400">No features added yet</p>
                    <p className="text-slate-500 text-sm mt-1">Click "Add Feature" to get started</p>
                </div>
            )}
        </div>
    );
};

export default FeaturesEditor;
