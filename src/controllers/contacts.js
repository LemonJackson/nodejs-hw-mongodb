import { getAllContacts, getContactById, createContact, updateContact, deleteContact } from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);
    const filter = parseFilterParams(req.query);
    const userId = req.user._id;

    const contacts = await getAllContacts({
        page,
        perPage,
        sortBy,
        sortOrder,
        filter,
        userId,
    });

    res.json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
    });
};

export const getContactByIdController = async (req, res, next) => {
    const { contactId } = req.params;
    const userId = req.user._id;
    const contact = await getContactById(contactId, userId);

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
    });
};

export const createContactController = async (req, res) => {
    const contactData = {
        ...req.body,
        userId: req.user._id,
    };

    const contact = await createContact(contactData, req);

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
    const userId = req.user._id;
    const result = await updateContact(contactId, req.body, userId);

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
    const userId = req.user._id;

    const contact = await deleteContact(contactId, userId);

    if (!contact) {
        next(createHttpError(404, 'Contact not found'));
        return;
    }

    res.status(204).send();
};

