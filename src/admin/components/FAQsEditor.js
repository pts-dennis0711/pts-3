import React from 'react';
import { Plus, X, HelpCircle } from 'lucide-react';

const FAQsEditor = ({ faqs = [], onChange }) => {
    const addFAQ = () => {
        onChange([...faqs, { question: '', answer: '' }]);
    };

    const removeFAQ = (index) => {
        onChange(faqs.filter((_, i) => i !== index));
    };

    const updateFAQ = (index, field, value) => {
        const updated = faqs.map((faq, i) =>
            i === index ? { ...faq, [field]: value } : faq
        );
        onChange(updated);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={addFAQ}
                    className="btn-admin-primary flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add FAQ
                </button>
            </div>

            {faqs.map((faq, index) => (
                <div key={index} className="glass-card p-6 border-l-4 border-orange-500">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-orange-500/10">
                                <HelpCircle className="text-orange-400" size={20} />
                            </div>
                            <h4 className="text-lg font-semibold text-white">FAQ {index + 1}</h4>
                        </div>
                        <button
                            type="button"
                            onClick={() => removeFAQ(index)}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Question</label>
                            <input
                                type="text"
                                value={faq.question || ''}
                                onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                                placeholder="Frequently asked question"
                                className="input-admin"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Answer</label>
                            <textarea
                                value={faq.answer || ''}
                                onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                                placeholder="Answer to the question"
                                rows={3}
                                className="input-admin"
                            />
                        </div>
                    </div>
                </div>
            ))}

            {faqs.length === 0 && (
                <div className="text-center py-12 glass-card">
                    <HelpCircle className="mx-auto mb-4 text-slate-600" size={48} />
                    <p className="text-slate-400">No FAQs added yet</p>
                    <p className="text-slate-500 text-sm mt-1">Click "Add FAQ" to get started</p>
                </div>
            )}
        </div>
    );
};

export default FAQsEditor;
