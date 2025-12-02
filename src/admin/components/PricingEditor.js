import React from 'react';
import { DollarSign, Plus, X } from 'lucide-react';

const PricingEditor = ({ pricing = {}, onChange }) => {
    const plans = [
        { id: 'trial', label: 'Trial' },
        { id: 'locked_license', label: 'Locked-License' },
        { id: 'locked_same_user', label: 'Locked Licenses by Same User' },
        { id: 'transferable_license', label: 'Transferable License' },
        { id: 'automation', label: 'Automation' }
    ];

    const handlePlanChange = (planId, field, value) => {
        onChange({
            ...pricing,
            [planId]: {
                ...pricing[planId],
                [field]: value
            }
        });
    };

    const handleFeatureChange = (planId, index, value) => {
        const features = [...(pricing[planId]?.features || [])];
        features[index] = value;
        handlePlanChange(planId, 'features', features);
    };

    const addFeature = (planId) => {
        const features = [...(pricing[planId]?.features || []), ''];
        handlePlanChange(planId, 'features', features);
    };

    const removeFeature = (planId, index) => {
        const features = (pricing[planId]?.features || []).filter((_, i) => i !== index);
        handlePlanChange(planId, 'features', features);
    };

    return (
        <div className="space-y-6">
            {plans.map(plan => (
                <div key={plan.id} className="glass-card p-6 border-l-4 border-cyan-500">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-cyan-500/10">
                            <DollarSign className="text-cyan-400" size={20} />
                        </div>
                        <h4 className="text-lg font-semibold text-white">{plan.label}</h4>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Price</label>
                            <input
                                type="text"
                                value={pricing[plan.id]?.price || ''}
                                onChange={(e) => handlePlanChange(plan.id, 'price', e.target.value)}
                                placeholder="e.g., $99"
                                className="input-admin"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                            <input
                                type="text"
                                value={pricing[plan.id]?.description || ''}
                                onChange={(e) => handlePlanChange(plan.id, 'description', e.target.value)}
                                placeholder="e.g., Single Machine"
                                className="input-admin"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-300 mb-2">CTA Text</label>
                        <input
                            type="text"
                            value={pricing[plan.id]?.cta_text || ''}
                            onChange={(e) => handlePlanChange(plan.id, 'cta_text', e.target.value)}
                            placeholder="e.g., Add to Cart"
                            className="input-admin"
                        />
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label className="block text-sm font-medium text-slate-300">Features</label>
                            <button
                                type="button"
                                onClick={() => addFeature(plan.id)}
                                className="btn-admin-primary flex items-center gap-2 text-sm py-2 px-3"
                            >
                                <Plus size={16} />
                                Add Feature
                            </button>
                        </div>
                        <div className="space-y-2">
                            {(pricing[plan.id]?.features || []).map((feature, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(plan.id, idx, e.target.value)}
                                        placeholder="Feature description"
                                        className="input-admin flex-1"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(plan.id, idx)}
                                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PricingEditor;
