import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

// Всі контакти

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder,
  sortBy,
  filter,
  userId,
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = Contact.find({ userId });

  if (typeof filter.type !== 'undefined') {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (typeof filter.isFavourite !== 'undefined') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contact.find({ userId }).merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};

// Пошук одного

export const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });
  return contact;
};

// Створення

export const createContact = async (payload, userId, file) => {
  let photoUrl = null;
  if (file) {
    photoUrl = await saveFileToCloudinary(file);
  }
  const contact = await Contact.create({ ...payload, userId, photo: photoUrl });
  return contact;
};

// Видалення

export const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({ _id: contactId, userId });
  return contact;
};

// Оновлення

export const patchContact = async (contactId, payload, userId, file) => {
  const contactExists = await Contact.findOne({ _id: contactId, userId });

  if (!contactExists) {
    return null;
  }
  const updateData = { ...payload };

  if (file) {
    const photoUrl = await saveFileToCloudinary(file);
    updateData.photo = photoUrl;
  }
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    updateData,
    {
      new: true,
    },
  );
  return updatedContact;
};
