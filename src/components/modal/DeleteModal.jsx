'use client'
import { TriangleExclamation } from '@gravity-ui/icons';
import { Button, Modal } from '@heroui/react';
import { toast } from 'react-toastify';
import React, { useState } from 'react';

const DeletePetModal = ({ pet, onDeleted }) => {
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        setDeleting(true);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/pets/${pet._id}`,
                { method: 'DELETE', credentials: 'include' }
            );

            if (!res.ok) throw new Error('Delete failed');

            toast.success('Listing deleted', {
                description: `"${pet.petName}" has been removed from your listings.`,
            });

            onDeleted?.(pet._id); 
        } catch (err) {
            toast.danger('Something went wrong', {
                description: 'Could not delete the listing. Please try again.',
            });
            setDeleting(false);
        }
    };

    return (
        <Modal>
            <Button
                variant="secondary"
                className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-base text-rose-600 hover:bg-rose-100 transition-colors"
            >
                Delete
            </Button>

            <Modal.Backdrop>
                <Modal.Container>
                    <Modal.Dialog className="sm:max-w-[380px]">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-rose-100 text-rose-600">
                                <TriangleExclamation className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Delete {pet.petName}?</Modal.Heading>
                        </Modal.Header>

                        <Modal.Body>
                            <p className="text-sm text-zinc-500">
                                Are you sure delete the request?
                            </p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button
                                variant="secondary"
                                className="flex-1"
                                slot="close"
                                isDisabled={deleting}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1 bg-rose-500 text-white hover:bg-rose-600"
                                onClick={handleDelete}
                                isDisabled={deleting}
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default DeletePetModal;