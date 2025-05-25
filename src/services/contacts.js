import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page,
  perPage,
  sortOrder,
  sortBy,
  filter,
}) => {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const contactsQuery = Contact.find();

  if (typeof filter.type !== 'undefined') {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (typeof filter.isFavourite !== 'undefined') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
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

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};

export const deleteContact = async (contactId) => {
  const contact = await Contact.findOneAndDelete({ _id: contactId });
  return contact;
};

export const patchContact = async (contactId, payload) => {
  return Contact.findByIdAndUpdate(contactId, payload, { new: true });
};
