'use client'

import { Gear } from '@gravity-ui/icons';
import { Button, Modal } from '@heroui/react';
import { toast } from 'react-toastify';
import React, { useState } from 'react';

const FormInput = ({ label, name, type = 'text', value, onChange, required, placeholder }) => (
    <div className="flex flex-col gap-1.5">
        <label htmlFor={name} className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
            {label}
        </label>
        <input
            id={name}
            type={type}
            name={name}
            required={required}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="w-full px-3.5 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
        />
    </div>
);

const EditPetModal = ({ pet, onUpdated }) => {
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        petName: pet?.petName || '',
        breed: pet?.breed || '',
        age: pet?.age || '',
        imageUrl: pet?.imageUrl || '',
        description: pet?.description || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/pets/${pet._id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Update failed');

            const updatedPet = await res.json();
            
            toast.success('Updated successfully', {
                description: `"${formData.petName}" listing has been updated.`,
            });

            onUpdated?.(updatedPet);
        } catch (err) {
            console.error('Update Pet Error:', err);
            toast.danger('Error', {
                description: 'Could not update the listing. Please try again.',
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal>
            <Button
                variant="secondary"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-200 transition-colors flex items-center gap-1.5"
            >
                <Gear className="size-3.5" />
                <span>Edit</span>
            </Button>

            <Modal.Backdrop className="backdrop-blur-sm bg-black/40">
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[480px] rounded-3xl border border-zinc-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xl overflow-hidden">
                        <Modal.CloseTrigger />
                        
                        <Modal.Header className="border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
                            <Modal.Heading className="text-xl font-bold text-zinc-800 dark:text-zinc-100">
                                Edit {pet?.petName || 'Pet'}
                            </Modal.Heading>
                        </Modal.Header>

                        <form onSubmit={handleUpdate}>
                            <Modal.Body className="p-5 space-y-4 max-h-[65vh] overflow-y-auto">
                                <FormInput
                                    label="Pet Name"
                                    name="petName"
                                    required
                                    value={formData.petName}
                                    onChange={handleChange}
                                    placeholder="e.g. Buddy"
                                />

                                <div className="grid grid-cols-2 gap-3">
                                    <FormInput
                                        label="Breed"
                                        name="breed"
                                        required
                                        value={formData.breed}
                                        onChange={handleChange}
                                        placeholder="e.g. Golden Retriever"
                                    />
                                    <FormInput
                                        label="Age"
                                        name="age"
                                        required
                                        value={formData.age}
                                        onChange={handleChange}
                                        placeholder="e.g. 2 years"
                                    />
                                </div>

                                <FormInput
                                    label="Image URL"
                                    name="imageUrl"
                                    type="url"
                                    required
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    placeholder="https://..."
                                />

                                <div className="flex flex-col gap-1.5">
                                    <label htmlFor="description" className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={3}
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Provide pet details..."
                                        className="w-full px-3.5 py-2 text-sm border border-zinc-200 dark:border-zinc-700 rounded-xl bg-zinc-50 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all resize-none"
                                    />
                                </div>
                            </Modal.Body>

                            <Modal.Footer className="border-t border-zinc-100 dark:border-zinc-800 pt-3">
                                <Button variant="secondary" className="flex-1 rounded-xl" slot="close" isDisabled={submitting}>
                                    Cancel
                                </Button>
                                <Button type="submit" className="flex-1 bg-rose-600 text-white hover:bg-rose-700 font-semibold rounded-xl" isDisabled={submitting}>
                                    {submitting ? 'Updating...' : 'Save Changes'}
                                </Button>
                            </Modal.Footer>
                        </form>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default EditPetModal;