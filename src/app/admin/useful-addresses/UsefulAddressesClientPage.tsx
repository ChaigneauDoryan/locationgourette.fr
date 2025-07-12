// src/app/admin/useful-addresses/page.tsx
"use client";

import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';


import { UsefulAddress } from '@/types/UsefulAddress';



// --- Sortable Item Component ---
function SortableItem({ address, onEdit, onDelete }: { address: UsefulAddress; onEdit: (address: UsefulAddress) => void; onDelete: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: address.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} className="bg-gray-50 p-4 mb-2 rounded-md shadow-sm flex justify-between items-center">
      <div className="flex items-center">
        <div {...listeners} className="cursor-grab p-2 mr-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-grip-vertical"><circle cx="9" cy="12" r="1"></circle><circle cx="9" cy="5" r="1"></circle><circle cx="9" cy="19" r="1"></circle><circle cx="15" cy="12" r="1"></circle><circle cx="15" cy="5" r="1"></circle><circle cx="15" cy="19" r="1"></circle></svg>
        </div>
        <div>
          <h3 className="font-semibold text-lg">{address.name}</h3>
          <p className="text-gray-600 text-sm">{address.description}</p>
          {address.url && <a href={address.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">{address.url}</a>}
        </div>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(address)}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Modifier
        </button>
        <button
          onClick={() => onDelete(address.id)}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}

// --- Useful Address Form Component ---
import { FaMapMarkerAlt, FaSkiing, FaTicketAlt, FaFilm, FaShoppingCart, FaStore, FaUtensils, FaMountain, FaTrain, FaQuestionCircle, FaHome, FaInfoCircle, FaPhone, FaEnvelope, FaCalendarAlt, FaClock, FaUser, FaCog, FaChartBar, FaBell, FaExclamationTriangle, FaCheckCircle, FaTimesCircle, FaPlus, FaEdit, FaTrash, FaSave, FaSearch, FaPrint, FaDownload, FaUpload, FaShareAlt, FaLink, FaExternalLinkAlt, FaBars, FaTimes, FaArrowLeft, FaArrowRight, FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight, FaTh, FaList, FaTable, FaFolder, FaFile, FaImage, FaVideo, FaMusic, FaGlobe, FaLock, FaUnlockAlt, FaKey, FaCreditCard, FaMoneyBillAlt, FaPercent, FaTag, FaTags, FaStar, FaHeart, FaThumbsUp, FaThumbsDown, FaComment, FaComments, FaQuoteLeft, FaQuoteRight, FaEye, FaEyeSlash, FaWifi, FaBluetoothB, FaBatteryFull, FaBatteryHalf, FaBatteryQuarter, FaBatteryEmpty, FaPlug, FaPowerOff, FaSyncAlt, FaRedo, FaUndo, FaHistory, FaHourglassHalf, FaSpinner, FaCircleNotch, FaEllipsisH, FaEllipsisV, FaQuestion, FaInfo, FaExclamation, FaAsterisk, FaHashtag, FaAt, FaCopyright, FaRegistered, FaTrademark, FaDollarSign, FaEuroSign, FaPoundSign, FaRupeeSign, FaYenSign, FaBitcoin, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaPaypal, FaStripe, FaAmazon, FaApple, FaWindows, FaLinux, FaAndroid, FaChrome, FaFirefox, FaEdge, FaSafari, FaOpera, FaInternetExplorer, FaGithub, FaGitlab, FaBitbucket, FaStackOverflow, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaPinterest, FaYoutube, FaVimeo, FaReddit, FaWhatsapp, FaTelegramPlane, FaSkype, FaSlack, FaDiscord, FaWordpress, FaShopify, FaMagento, FaDrupal, FaJoomla, FaReact, FaAngular, FaVuejs, FaNodeJs, FaPython, FaPhp, FaJava, FaCsharp, FaHtml5, FaCss3Alt, FaJsSquare, FaDatabase, FaServer, FaCloud, FaTerminal, FaCode, FaBug, FaGavel, FaShieldAlt, FaUserShield, FaUserLock, FaUserPlus, FaUserMinus, FaUserTimes, FaUsers, FaUserCircle, FaIdCard, FaAddressBook, FaAddressCard, FaEnvelopeOpen, FaPaperPlane, FaInbox, FaCalendarCheck, FaCalendarMinus, FaCalendarPlus, FaCalendarTimes } from 'react-icons/fa';
import { DiCplusplus } from 'react-icons/di';
import IconSelect from '@/components/IconSelect';

// Liste des icônes disponibles
const availableIcons = [
  { name: 'Aucune', component: FaQuestionCircle },
  { name: 'FaMapMarkerAlt', component: FaMapMarkerAlt },
  { name: 'FaSkiing', component: FaSkiing },
  { name: 'FaTicketAlt', component: FaTicketAlt },
  { name: 'FaFilm', component: FaFilm },
  { name: 'FaShoppingCart', component: FaShoppingCart },
  { name: 'FaStore', component: FaStore },
  { name: 'FaUtensils', component: FaUtensils },
  { name: 'FaMountain', component: FaMountain },
  { name: 'FaTrain', component: FaTrain },
  { name: 'FaHome', component: FaHome },
  { name: 'FaInfoCircle', component: FaInfoCircle },
  { name: 'FaPhone', component: FaPhone },
  { name: 'FaEnvelope', component: FaEnvelope },
  { name: 'FaCalendarAlt', component: FaCalendarAlt },
  { name: 'FaClock', component: FaClock },
  { name: 'FaUser', component: FaUser },
  { name: 'FaCog', component: FaCog },
  { name: 'FaChartBar', component: FaChartBar },
  { name: 'FaBell', component: FaBell },
  { name: 'FaExclamationTriangle', component: FaExclamationTriangle },
  { name: 'FaCheckCircle', component: FaCheckCircle },
  { name: 'FaTimesCircle', component: FaTimesCircle },
  { name: 'FaPlus', component: FaPlus },
  { name: 'FaEdit', component: FaEdit },
  { name: 'FaTrash', component: FaTrash },
  { name: 'FaSave', component: FaSave },
  { name: 'FaSearch', component: FaSearch },
  { name: 'FaPrint', component: FaPrint },
  { name: 'FaDownload', component: FaDownload },
  { name: 'FaUpload', component: FaUpload },
  { name: 'FaShareAlt', component: FaShareAlt },
  { name: 'FaLink', component: FaLink },
  { name: 'FaExternalLinkAlt', component: FaExternalLinkAlt },
  { name: 'FaBars', component: FaBars },
  { name: 'FaTimes', component: FaTimes },
  { name: 'FaArrowLeft', component: FaArrowLeft },
  { name: 'FaArrowRight', component: FaArrowRight },
  { name: 'FaChevronDown', component: FaChevronDown },
  { name: 'FaChevronUp', component: FaChevronUp },
  { name: 'FaChevronLeft', component: FaChevronLeft },
  { name: 'FaChevronRight', component: FaChevronRight },
  { name: 'FaTh', component: FaTh },
  { name: 'FaList', component: FaList },
  { name: 'FaTable', component: FaTable },
  { name: 'FaFolder', component: FaFolder },
  { name: 'FaFile', component: FaFile },
  { name: 'FaImage', component: FaImage },
  { name: 'FaVideo', component: FaVideo },
  { name: 'FaMusic', component: FaMusic },
  { name: 'FaGlobe', component: FaGlobe },
  { name: 'FaLock', component: FaLock },
  { name: 'FaUnlockAlt', component: FaUnlockAlt },
  { name: 'FaKey', component: FaKey },
  { name: 'FaCreditCard', component: FaCreditCard },
  { name: 'FaMoneyBillAlt', component: FaMoneyBillAlt },
  { name: 'FaPercent', component: FaPercent },
  { name: 'FaTag', component: FaTag },
  { name: 'FaTags', component: FaTags },
  { name: 'FaStar', component: FaStar },
  { name: 'FaHeart', component: FaHeart },
  { name: 'FaThumbsUp', component: FaThumbsUp },
  { name: 'FaThumbsDown', component: FaThumbsDown },
  { name: 'FaComment', component: FaComment },
  { name: 'FaComments', component: FaComments },
  { name: 'FaQuoteLeft', component: FaQuoteLeft },
  { name: 'FaQuoteRight', component: FaQuoteRight },
  { name: 'FaEye', component: FaEye },
  { name: 'FaEyeSlash', component: FaEyeSlash },
  { name: 'FaWifi', component: FaWifi },
  { name: 'FaBluetoothB', component: FaBluetoothB },
  { name: 'FaBatteryFull', component: FaBatteryFull },
  { name: 'FaBatteryHalf', component: FaBatteryHalf },
  { name: 'FaBatteryQuarter', component: FaBatteryQuarter },
  { name: 'FaBatteryEmpty', component: FaBatteryEmpty },
  { name: 'FaPlug', component: FaPlug },
  { name: 'FaPowerOff', component: FaPowerOff },
  { name: 'FaSyncAlt', component: FaSyncAlt },
  { name: 'FaRedo', component: FaRedo },
  { name: 'FaUndo', component: FaUndo },
  { name: 'FaHistory', component: FaHistory },
  { name: 'FaHourglassHalf', component: FaHourglassHalf },
  { name: 'FaSpinner', component: FaSpinner },
  { name: 'FaCircleNotch', component: FaCircleNotch },
  { name: 'FaEllipsisH', component: FaEllipsisH },
  { name: 'FaEllipsisV', component: FaEllipsisV },
  { name: 'FaQuestion', component: FaQuestion },
  { name: 'FaInfo', component: FaInfo },
  { name: 'FaExclamation', component: FaExclamation },
  { name: 'FaAsterisk', component: FaAsterisk },
  { name: 'FaHashtag', component: FaHashtag },
  { name: 'FaAt', component: FaAt },
  { name: 'FaCopyright', component: FaCopyright },
  { name: 'FaRegistered', component: FaRegistered },
  { name: 'FaTrademark', component: FaTrademark },
  { name: 'FaDollarSign', component: FaDollarSign },
  { name: 'FaEuroSign', component: FaEuroSign },
  { name: 'FaPoundSign', component: FaPoundSign },
  { name: 'FaRupeeSign', component: FaRupeeSign },
  { name: 'FaYenSign', component: FaYenSign },
  { name: 'FaBitcoin', component: FaBitcoin },
  { name: 'FaCcVisa', component: FaCcVisa },
  { name: 'FaCcMastercard', component: FaCcMastercard },
  { name: 'FaCcAmex', component: FaCcAmex },
  { name: 'FaCcDiscover', component: FaCcDiscover },
  { name: 'FaPaypal', component: FaPaypal },
  { name: 'FaStripe', component: FaStripe },
  { name: 'FaAmazon', component: FaAmazon },
  { name: 'FaApple', component: FaApple },
  { name: 'FaWindows', component: FaWindows },
  { name: 'FaLinux', component: FaLinux },
  { name: 'FaAndroid', component: FaAndroid },
  { name: 'FaChrome', component: FaChrome },
  { name: 'FaFirefox', component: FaFirefox },
  { name: 'FaEdge', component: FaEdge },
  { name: 'FaSafari', component: FaSafari },
  { name: 'FaOpera', component: FaOpera },
  { name: 'FaInternetExplorer', component: FaInternetExplorer },
  { name: 'FaGithub', component: FaGithub },
  { name: 'FaGitlab', component: FaGitlab },
  { name: 'FaBitbucket', component: FaBitbucket },
  { name: 'FaStackOverflow', component: FaStackOverflow },
  { name: 'FaLinkedin', component: FaLinkedin },
  { name: 'FaTwitter', component: FaTwitter },
  { name: 'FaFacebook', component: FaFacebook },
  { name: 'FaInstagram', component: FaInstagram },
  { name: 'FaPinterest', component: FaPinterest },
  { name: 'FaYoutube', component: FaYoutube },
  { name: 'FaVimeo', component: FaVimeo },
  { name: 'FaReddit', component: FaReddit },
  { name: 'FaWhatsapp', component: FaWhatsapp },
  { name: 'FaTelegramPlane', component: FaTelegramPlane },
  { name: 'FaSkype', component: FaSkype },
  { name: 'FaSlack', component: FaSlack },
  { name: 'FaDiscord', component: FaDiscord },
  { name: 'FaWordpress', component: FaWordpress },
  { name: 'FaShopify', component: FaShopify },
  { name: 'FaMagento', component: FaMagento },
  { name: 'FaDrupal', component: FaDrupal },
  { name: 'FaJoomla', component: FaJoomla },
  { name: 'FaReact', component: FaReact },
  { name: 'FaAngular', component: FaAngular },
  { name: 'FaVuejs', component: FaVuejs },
  { name: 'FaNodeJs', component: FaNodeJs },
  { name: 'FaPython', component: FaPython },
  { name: 'FaPhp', component: FaPhp },
  { name: 'FaJava', component: FaJava },
  { name: 'DiCplusplus', component: DiCplusplus },
  { name: 'FaCsharp', component: FaCsharp },
  { name: 'FaHtml5', component: FaHtml5 },
  { name: 'FaCss3Alt', component: FaCss3Alt },
  { name: 'FaJsSquare', component: FaJsSquare },
  { name: 'FaDatabase', component: FaDatabase },
  { name: 'FaServer', component: FaServer },
  { name: 'FaCloud', component: FaCloud },
  { name: 'FaTerminal', component: FaTerminal },
  { name: 'FaCode', component: FaCode },
  { name: 'FaBug', component: FaBug },
  { name: 'FaGavel', component: FaGavel },
  { name: 'FaShieldAlt', component: FaShieldAlt },
  { name: 'FaUserShield', component: FaUserShield },
  { name: 'FaUserLock', component: FaUserLock },
  { name: 'FaUserPlus', component: FaUserPlus },
  { name: 'FaUserMinus', component: FaUserMinus },
  { name: 'FaUserTimes', component: FaUserTimes },
  { name: 'FaUsers', component: FaUsers },
  { name: 'FaUserCircle', component: FaUserCircle },
  { name: 'FaIdCard', component: FaIdCard },
  { name: 'FaAddressBook', component: FaAddressBook },
  { name: 'FaAddressCard', component: FaAddressCard },
  { name: 'FaEnvelopeOpen', component: FaEnvelopeOpen },
  { name: 'FaPaperPlane', component: FaPaperPlane },
  { name: 'FaInbox', component: FaInbox },
  { name: 'FaCalendarCheck', component: FaCalendarCheck },
    { name: 'FaCalendarMinus', component: FaCalendarMinus },
    { name: 'FaCalendarPlus', component: FaCalendarPlus },
    { name: 'FaCalendarTimes', component: FaCalendarTimes },
];

function UsefulAddressForm({ currentAddress, onSave, onCancel, addUsefulAddress, updateUsefulAddress }: {
  currentAddress: UsefulAddress | null;
  onSave: () => void;
  onCancel: () => void;
  addUsefulAddress: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
  updateUsefulAddress: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
}) {
  const [name, setName] = useState(currentAddress?.name || '');
  const [description, setDescription] = useState(currentAddress?.description || '');
  const [url, setUrl] = useState(currentAddress?.url || '');
  const [iconName, setIconName] = useState(currentAddress?.icon_name || ''); // Nouvel état pour l'icône
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setName(currentAddress?.name || '');
    setDescription(currentAddress?.description || '');
    setUrl(currentAddress?.url || '');
    setIconName(currentAddress?.icon_name || ''); // Mettre à jour l'état de l'icône
  }, [currentAddress]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    if (currentAddress) {
      formData.append('id', currentAddress.id);
    }
    formData.append('name', name);
    formData.append('description', description);
    formData.append('url', url);
    formData.append('icon_name', iconName); // Ajouter le nom de l'icône au formData

    let result;
    if (currentAddress) {
      result = await updateUsefulAddress(formData);
    } else {
      result = await addUsefulAddress(formData);
    }

    if (result.success) {
      onSave(); // Notify parent to refresh data and close form
      // If it was an add operation (currentAddress was null), clear the form fields
      if (!currentAddress) {
        setName('');
        setDescription('');
        setUrl('');
        setIconName(''); // Vider le champ de l'icône après ajout
      }
    } else {
      alert(`Une erreur est survenue lors de l'enregistrement de l'adresse: ${result.error || 'Unknown error'}`);
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nom</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
        ></textarea>
      </div>
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700">URL</label>
        <input
          type="url"
          id="url"
          name="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
        />
      </div>
      <IconSelect
        label="Icône"
        value={iconName}
        onChange={setIconName}
        options={availableIcons}
      />
      <div className="flex space-x-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 disabled:opacity-50"
        >
          {isSubmitting ? 'Enregistrement...' : (currentAddress ? 'Modifier l\'adresse' : 'Ajouter l\'adresse')}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}


// --- Main Page Component ---
interface UsefulAddressesClientPageProps {
  initialAddresses: UsefulAddress[];
  addUsefulAddress: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
  updateUsefulAddress: (formData: FormData) => Promise<{ success: boolean; error?: string }>;
  deleteUsefulAddress: (id: string) => Promise<{ success: boolean; error?: string }>;
  updateAddressesOrder: (orderedAddresses: UsefulAddress[]) => Promise<{ success: boolean; error?: string }>;
}


// --- Main Page Component ---
export default function UsefulAddressesClientPage({ initialAddresses, addUsefulAddress, updateUsefulAddress, deleteUsefulAddress, updateAddressesOrder }: UsefulAddressesClientPageProps) {
  const router = useRouter();
  const [addresses, setAddresses] = useState<UsefulAddress[]>(initialAddresses);
  const [editingAddress, setEditingAddress] = useState<UsefulAddress | null>(null); // State for editing

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  

  useEffect(() => {
    setAddresses(initialAddresses);
  }, [initialAddresses]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = addresses.findIndex(addr => addr.id === active.id);
      const newIndex = addresses.findIndex(addr => addr.id === over.id);

      const newAddresses = [...addresses];
      const [movedItem] = newAddresses.splice(oldIndex, 1);
      newAddresses.splice(newIndex, 0, movedItem);

      setAddresses(newAddresses); // Optimistic update

      const result = await updateAddressesOrder(newAddresses);
      if (!result.success) {
        console.error('Failed to update order on server.', result.error);
        alert(`Failed to update order: ${result.error || 'Unknown error'}`);
        // If optimistic update fails, revert by re-fetching or using initialAddresses
        setAddresses(initialAddresses); // Revert to initial state
      }
    }
  };

  const handleEdit = (address: UsefulAddress) => {
    setEditingAddress(address);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette adresse ?')) {
      const result = await deleteUsefulAddress(id);
      if (result.success) {
        // Re-fetch or rely on revalidation
        // For now, we'll assume the server action revalidates the path.
        // If a full re-fetch is needed, it would be: const fetchedAddresses = await getUsefulAddressesServer(); setAddresses(fetchedAddresses);
      } else {
        alert(`Erreur lors de la suppression de l\'adresse: ${result.error || 'Unknown error'}`);
      }
    }
  };

  const handleFormSave = () => {
    setEditingAddress(null); // Close form
    // No need to refreshAddresses here, as server actions will revalidate
  };

  const handleFormCancel = () => {
    setEditingAddress(null); // Close form
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <button
          onClick={() => router.back()}
          className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75"
        >
          ← Retour
        </button>
        <h1 className="text-3xl font-bold mb-6">Gérer les adresses utiles</h1>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={addresses.map(addr => addr.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {addresses.length === 0 ? (
                <p className="text-gray-500">Aucune adresse utile pour le moment. Ajoutez-en une !</p>
              ) : (
                addresses.map((address) => (
                  <SortableItem key={address.id} address={address} onEdit={handleEdit} onDelete={handleDelete} />
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">{editingAddress ? 'Modifier l\'adresse' : 'Ajouter l\'adresse'}</h2>
          <UsefulAddressForm
            currentAddress={editingAddress}
            onSave={handleFormSave}
            onCancel={handleFormCancel}
            addUsefulAddress={addUsefulAddress}
            updateUsefulAddress={updateUsefulAddress}
          />
        </div>
      </div>
    </div>
  );
}