import React from 'react';
import { Plus, X, MessageSquare } from 'lucide-react';

const TestimonialsEditor = ({ testimonials = [], onChange }) => {
    const addTestimonial = () => {
        onChange([...testimonials, { name: '', role: '', company: '', quote: '', image: '', rating: 5 }]);
    };

    const removeTestimonial = (index) => {
        onChange(testimonials.filter((_, i) => i !== index));
    };

    const updateTestimonial = (index, field, value) => {
        const updated = testimonials.map((testimonial, i) =>
            i === index ? { ...testimonial, [field]: value } : testimonial
        );
        onChange(updated);
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-end">
                <button
                    type="button"
                    onClick={addTestimonial}
                    className="btn-admin-primary flex items-center gap-2"
                >
                    <Plus size={20} />
                    Add Testimonial
                </button>
            </div>

            {testimonials.map((testimonial, index) => (
                <div key={index} className="glass-card p-6 border-l-4 border-green-500">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-green-500/10">
                                <MessageSquare className="text-green-400" size={20} />
                            </div>
                            <h4 className="text-lg font-semibold text-white">Testimonial {index + 1}</h4>
                        </div>
                        <button
                            type="button"
                            onClick={() => removeTestimonial(index)}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                                <input
                                    type="text"
                                    value={testimonial.name || ''}
                                    onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                                    placeholder="Customer name"
                                    className="input-admin"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Role</label>
                                <input
                                    type="text"
                                    value={testimonial.role || ''}
                                    onChange={(e) => updateTestimonial(index, 'role', e.target.value)}
                                    placeholder="Job title"
                                    className="input-admin"
                                />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
                                <input
                                    type="text"
                                    value={testimonial.company || ''}
                                    onChange={(e) => updateTestimonial(index, 'company', e.target.value)}
                                    placeholder="Company name"
                                    className="input-admin"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Image URL</label>
                                <input
                                    type="text"
                                    value={testimonial.image || ''}
                                    onChange={(e) => updateTestimonial(index, 'image', e.target.value)}
                                    placeholder="https://..."
                                    className="input-admin"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">Quote</label>
                            <textarea
                                value={testimonial.quote || ''}
                                onChange={(e) => updateTestimonial(index, 'quote', e.target.value)}
                                placeholder="Testimonial quote"
                                rows={3}
                                className="input-admin"
                            />
                        </div>
                    </div>
                </div>
            ))}

            {testimonials.length === 0 && (
                <div className="text-center py-12 glass-card">
                    <MessageSquare className="mx-auto mb-4 text-slate-600" size={48} />
                    <p className="text-slate-400">No testimonials added yet</p>
                    <p className="text-slate-500 text-sm mt-1">Click "Add Testimonial" to get started</p>
                </div>
            )}
        </div>
    );
};

export default TestimonialsEditor;
