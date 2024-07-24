import { getAllContacts, getContactById, createContact, updateContact, deleteContact } from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
    const contacts = await getAllContacts();

    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
        throw createHttpError(404, 'Contact not found');
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};

export const createContactController = async (req, res) => {
    const contact = await createContact(req.body);

    res.status(201).json({
        status: 201,
        message: `Successfully created a contact!`,
        data: contact,
    });

    // try {
    //     const { name, phoneNumber, email, contactType } = req.body;
    //     if (!name || !phoneNumber) {
    //         return res.status(400).json({
    //             status: 'error',
    //             message: 'Name and phone number are required.',
    //         });
    //     }

    //     const newContact = await createContact({
    //         name,
    //         phoneNumber,
    //         email,
    //         contactType,
    //     });

    //     res.status(201).json({
    //         status: 201,
    //         data: newContact,
    //         message: 'Successfully created a contact!',
    //     });
    // } catch (error) {
    //     res.status(500).json({
    //         status: 'error',
    //         message: 'Error creating contact',
    //         error: error.message,
    //     });
    // }
};

export const patchContactController = async (req, res, next) => {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.json({
        status: 200,
        message: `Successfully patched a Contact!`,
        data: result.contact,
    });
};

export const deleteContactController = async (req, res, next) => {
    const { contactId } = req.params;

    const contact = await deleteContact(contactId);

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.status(204).send();
};

