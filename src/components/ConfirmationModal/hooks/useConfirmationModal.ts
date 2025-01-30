'use client';

import { useState } from 'react';


export const useConfirmationModal = (handleConfirmation: (arg: string) => Promise<void>) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [arg, setArg] = useState('');

  const handleOpenModal = (prop: string) => () => {
    setModalOpen(true)
    prop && setArg(prop);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false)
    setArg('');
  };

  const handleConfirm = () => {
    handleConfirmation(arg);
    handleCloseModal();
  };

  return {
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
    handleConfirm,
  };
};
