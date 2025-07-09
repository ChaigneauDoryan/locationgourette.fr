import React, { useState, useRef, useEffect } from 'react';
import { FaMapMarkerAlt, FaSkiing, FaTicketAlt, FaFilm, FaShoppingCart, FaStore, FaUtensils, FaMountain, FaTrain, FaQuestionCircle, FaHome, FaInfoCircle, FaPhone, FaEnvelope, FaCalendarAlt, FaClock, FaUser, FaCog, FaChartBar, FaBell, FaExclamationTriangle, FaCheckCircle, FaTimesCircle, FaPlus, FaEdit, FaTrash, FaSave, FaSearch, FaPrint, FaDownload, FaUpload, FaShareAlt, FaLink, FaExternalLinkAlt, FaBars, FaTimes, FaArrowLeft, FaArrowRight, FaChevronDown, FaChevronUp, FaChevronLeft, FaChevronRight, FaTh, FaList, FaTable, FaFolder, FaFile, FaImage, FaVideo, FaMusic, FaGlobe, FaLock, FaUnlockAlt, FaKey, FaCreditCard, FaMoneyBillAlt, FaPercent, FaTag, FaTags, FaStar, FaHeart, FaThumbsUp, FaThumbsDown, FaComment, FaComments, FaQuoteLeft, FaQuoteRight, FaEye, FaEyeSlash, FaWifi, FaBluetoothB, FaBatteryFull, FaBatteryHalf, FaBatteryQuarter, FaBatteryEmpty, FaPlug, FaPowerOff, FaSyncAlt, FaRedo, FaUndo, FaHistory, FaHourglassHalf, FaSpinner, FaCircleNotch, FaEllipsisH, FaEllipsisV, FaQuestion, FaInfo, FaExclamation, FaAsterisk, FaHashtag, FaAt, FaCopyright, FaRegistered, FaTrademark, FaDollarSign, FaEuroSign, FaPoundSign, FaRupeeSign, FaYenSign, FaBitcoin, FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaPaypal, FaStripe, FaAmazon, FaApple, FaWindows, FaLinux, FaAndroid, FaChrome, FaFirefox, FaEdge, FaSafari, FaOpera, FaInternetExplorer, FaGithub, FaGitlab, FaBitbucket, FaStackOverflow, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaPinterest, FaYoutube, FaVimeo, FaReddit, FaWhatsapp, FaTelegramPlane, FaSkype, FaSlack, FaDiscord, FaWordpress, FaShopify, FaMagento, FaDrupal, FaJoomla, FaReact, FaAngular, FaVuejs, FaNodeJs, FaPython, FaPhp, FaJava, FaCplusplus, FaCsharp, FaHtml5, FaCss3Alt, FaJsSquare, FaDatabase, FaServer, FaCloud, FaTerminal, FaCode, FaBug, FaGavel, FaShieldAlt, FaUserShield, FaUserLock, FaUserPlus, FaUserMinus, FaUserTimes, FaUsers, FaUserCircle, FaIdCard, FaAddressBook, FaAddressCard, FaEnvelopeOpen, FaPaperPlane, FaInbox, FaCalendarCheck, FaCalendarMinus, FaCalendarPlus, FaCalendarTimes, FaClipboard, FaClipboardCheck, FaClipboardList, FaClipboardQuestion, FaClipboardUser, FaClipboardWithCheck, FaClipboardWithList, FaClipboardWithUser, FaClipboardWithQuestion, FaClipboardWithTimes, FaClipboardWithPlus, FaClipboardWithMinus, FaClipboardWithEdit, FaClipboardWithTrash, FaClipboardWithSave, FaClipboardWithSearch, FaClipboardWithPrint, FaClipboardWithDownload, FaClipboardWithUpload, FaClipboardWithShare, FaClipboardWithLink, FaClipboardWithExternalLink, FaClipboardWithBars, FaClipboardWithTimes, FaClipboardWithArrowLeft, FaClipboardWithArrowRight, FaClipboardWithChevronDown, FaClipboardWithChevronUp, FaClipboardWithChevronLeft, FaClipboardWithChevronRight, FaClipboardWithTh, FaClipboardWithList, FaClipboardWithTable, FaClipboardWithFolder, FaClipboardWithFile, FaClipboardWithImage, FaClipboardWithVideo, FaClipboardWithMusic, FaClipboardWithGlobe, FaClipboardWithLock, FaClipboardWithUnlock, FaClipboardWithKey, FaClipboardWithCreditCard, FaClipboardWithMoneyBill, FaClipboardWithPercent, FaClipboardWithTag, FaClipboardWithTags, FaClipboardWithStar, FaClipboardWithHeart, FaClipboardWithThumbsUp, FaClipboardWithThumbsDown, FaClipboardWithComment, FaClipboardWithComments, FaClipboardWithQuoteLeft, FaClipboardWithQuoteRight, FaClipboardWithEye, FaClipboardWithEyeSlash, FaClipboardWithWifi, FaClipboardWithBluetooth, FaClipboardWithBatteryFull, FaClipboardWithBatteryHalf, FaClipboardWithBatteryQuarter, FaClipboardWithBatteryEmpty, FaClipboardWithPlug, FaClipboardWithPowerOff, FaClipboardWithSync, FaClipboardWithRedo, FaClipboardWithUndo, FaClipboardWithHistory, FaClipboardWithHourglass, FaClipboardWithSpinner, FaClipboardWithCircleNotch, FaClipboardWithEllipsisH, FaClipboardWithEllipsisV, FaClipboardWithQuestion, FaClipboardWithInfo, FaClipboardWithExclamation, FaClipboardWithAsterisk, FaClipboardWithHashtag, FaClipboardWithAt, FaClipboardWithCopyright, FaClipboardWithRegistered, FaClipboardWithTrademark, FaClipboardWithDollar, FaClipboardWithEuro, FaClipboardWithPound, FaClipboardWithRupee, FaClipboardWithYen, FaClipboardWithBitcoin, FaClipboardWithCcVisa, FaClipboardWithCcMastercard, FaClipboardWithCcAmex, FaClipboardWithCcDiscover, FaClipboardWithPaypal, FaClipboardWithStripe, FaClipboardWithAmazon, FaClipboardWithApple, FaClipboardWithWindows, FaClipboardWithLinux, FaClipboardWithAndroid, FaClipboardWithChrome, FaClipboardWithFirefox, FaClipboardWithEdge, FaClipboardWithSafari, FaClipboardWithOpera, FaClipboardWithInternetExplorer, FaClipboardWithGithub, FaClipboardWithGitlab, FaClipboardWithBitbucket, FaClipboardWithStackOverflow, FaClipboardWithLinkedin, FaClipboardWithTwitter, FaClipboardWithFacebook, FaClipboardWithInstagram, FaClipboardWithPinterest, FaClipboardWithYoutube, FaClipboardWithVimeo, FaClipboardWithReddit, FaClipboardWithWhatsapp, FaClipboardWithTelegram, FaClipboardWithSkype, FaClipboardWithSlack, FaClipboardWithDiscord, FaClipboardWithWordpress, FaClipboardWithShopify, FaClipboardWithMagento, FaClipboardWithDrupal, FaClipboardWithJoomla, FaClipboardWithReact, FaClipboardWithAngular, FaClipboardWithVuejs, FaClipboardWithNodeJs, FaClipboardWithPython, FaClipboardWithPhp, FaClipboardWithJava, FaClipboardWithCplusplus, FaClipboardWithCsharp, FaClipboardWithHtml5, FaClipboardWithCss3, FaClipboardWithJsSquare, FaClipboardWithDatabase, FaClipboardWithServer, FaClipboardWithCloud, FaClipboardWithTerminal, FaClipboardWithCode, FaClipboardWithBug, FaClipboardWithGavel, FaClipboardWithShield, FaClipboardWithUserShield, FaClipboardWithUserLock, FaClipboardWithUserPlus, FaClipboardWithUserMinus, FaClipboardWithUserTimes, FaClipboardWithUsers, FaClipboardWithUserCircle, FaClipboardWithIdCard, FaClipboardWithAddressBook, FaClipboardWithAddressCard, FaClipboardWithEnvelopeOpen, FaClipboardWithPaperPlane, FaClipboardWithInbox, FaClipboardWithCalendarCheck, FaClipboardWithCalendarMinus, FaClipboardWithCalendarPlus, FaClipboardWithCalendarTimes } from 'react-icons/fa';

interface IconOption {
  name: string;
  component: React.ElementType;
}

interface IconSelectProps {
  options: IconOption[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

const iconComponents: { [key: string]: React.ElementType } = {
  FaMapMarkerAlt,
  FaSkiing,
  FaTicketAlt,
  FaFilm,
  FaShoppingCart,
  FaStore,
  FaUtensils,
  FaMountain,
  FaTrain,
  FaQuestionCircle,
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaCog,
  FaChartBar,
  FaBell,
  FaExclamationTriangle,
  FaCheckCircle,
  FaTimesCircle,
  FaPlus,
  FaEdit,
  FaTrash,
  FaSave,
  FaSearch,
  FaPrint,
  FaDownload,
  FaUpload,
  FaShareAlt,
  FaLink,
  FaExternalLinkAlt,
  FaBars,
  FaTimes,
  FaArrowLeft,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaChevronLeft,
  FaChevronRight,
  FaTh,
  FaList,
  FaTable,
  FaFolder,
  FaFile,
  FaImage,
  FaVideo,
  FaMusic,
  FaGlobe,
  FaLock,
  FaUnlockAlt,
  FaKey,
  FaCreditCard,
  FaMoneyBillAlt,
  FaPercent,
  FaTag,
  FaTags,
  FaStar,
  FaHeart,
  FaThumbsUp,
  FaThumbsDown,
  FaComment,
  FaComments,
  FaQuoteLeft,
  FaQuoteRight,
  FaEye,
  FaEyeSlash,
  FaWifi,
  FaBluetoothB,
  FaBatteryFull,
  FaBatteryHalf,
  FaBatteryQuarter,
  FaBatteryEmpty,
  FaPlug,
  FaPowerOff,
  FaSyncAlt,
  FaRedo,
  FaUndo,
  FaHistory,
  FaHourglassHalf,
  FaSpinner,
  FaCircleNotch,
  FaEllipsisH,
  FaEllipsisV,
  FaQuestion,
  FaInfo,
  FaExclamation,
  FaAsterisk,
  FaHashtag,
  FaAt,
  FaCopyright,
  FaRegistered,
  FaTrademark,
  FaDollarSign,
  FaEuroSign,
  FaPoundSign,
  FaRupeeSign,
  FaYenSign,
  FaBitcoin,
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaPaypal,
  FaStripe,
  FaAmazon,
  FaApple,
  FaWindows,
  FaLinux,
  FaAndroid,
  FaChrome,
  FaFirefox,
  FaEdge,
  FaSafari,
  FaOpera,
  FaInternetExplorer,
  FaGithub,
  FaGitlab,
  FaBitbucket,
  FaStackOverflow,
  FaLinkedin,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaYoutube,
  FaVimeo,
  FaReddit,
  FaWhatsapp,
  FaTelegramPlane,
  FaSkype,
  FaSlack,
  FaDiscord,
  FaWordpress,
  FaShopify,
  FaMagento,
  FaDrupal,
  FaJoomla,
  FaReact,
  FaAngular,
  FaVuejs,
  FaNodeJs,
  FaPython,
  FaPhp,
  FaJava,
  FaCplusplus,
  FaCsharp,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaDatabase,
  FaServer,
  FaCloud,
  FaTerminal,
  FaCode,
  FaBug,
  FaGavel,
  FaShieldAlt,
  FaUserShield,
  FaUserLock,
  FaUserPlus,
  FaUserMinus,
  FaUserTimes,
  FaUsers,
  FaUserCircle,
  FaIdCard,
  FaAddressBook,
  FaAddressCard,
  FaEnvelopeOpen,
  FaPaperPlane,
  FaInbox,
  FaCalendarCheck,
  FaCalendarMinus,
  FaCalendarPlus,
  FaCalendarTimes,
};

const IconSelect: React.FC<IconSelectProps> = ({ options, value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(option => option.name === value) || options[0];
  const SelectedIconComponent = selectedOption ? iconComponents[selectedOption.name] : FaQuestionCircle;

  const handleSelect = (optionName: string) => {
    onChange(optionName);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={selectRef}>
      <label htmlFor="icon_select" className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <button
        type="button"
        id="icon_select"
        className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center">
          {SelectedIconComponent && <SelectedIconComponent className="h-5 w-5 text-gray-400 mr-2" />}
          <span className="block truncate">{selectedOption ? selectedOption.name : 'Sélectionner une icône'}</span>
        </span>
        <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </span>
      </button>

      {isOpen && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          tabIndex={-1}
          role="listbox"
          aria-labelledby="icon_select"
        >
          {options.map((option) => {
            const OptionIconComponent = iconComponents[option.name];
            return (
              <li
                key={option.name}
                className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-100"
                id={`icon-option-${option.name}`}
                role="option"
                aria-selected={option.name === value}
                onClick={() => handleSelect(option.name)}
              >
                <div className="flex items-center">
                  {OptionIconComponent && <OptionIconComponent className="h-5 w-5 text-gray-400 mr-2" />}
                  <span className="font-normal block truncate">
                    {option.name}
                  </span>
                </div>

                {option.name === value ? (
                  <span className="text-blue-600 absolute inset-y-0 right-0 flex items-center pr-4">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default IconSelect;
