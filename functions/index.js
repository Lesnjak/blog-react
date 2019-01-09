const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const createNotification = ((notification) => {
    return admin.firestore().collection('notifications')
        .add(notification)
        .then(doc => console.log('notification added', doc));
});


exports.projectCreated = functions.firestore
    .document('projects/{projectId}')
    .onCreate(doc => {

        const project = doc.data();
        const notification = {
            content: 'Added a new project',
            user: `${project.authorFirstName} ${project.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notification);

    });
exports.projectUpdate= functions.firestore
    .document('projects/{projectId}')
    .onUpdate((change, context) => {


        // Get an object representing the document
        // e.g. {'name': 'Marie', 'age': 66}
        const newValue = change.after.data();

        // ...or the previous value before this update
        const previousValue = change.before.data();

        // access a particular field as you would any JS property
        // const name = newValue.name;

        // perform desired operations ...
        const notification = {
            content: 'Update project',
            user: `${newValue.authorFirstName} ${newValue.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notification);

    });
exports.projectDelete= functions.firestore
    .document('projects/{projectId}')
    .onDelete((snap, context) => {

        const deletedValue = snap.data();
        const notification = {
            content: 'Delete project',
            user: `${deletedValue.authorFirstName} ${deletedValue.authorLastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }

        return createNotification(notification);

    });

exports.userJoined = functions.auth.user()
    .onCreate(user => {

        return admin.firestore().collection('users')
            .doc(user.uid).get().then(doc => {

                const newUser = doc.data();
                const notification = {
                    content: 'Joined the party',
                    user: `${newUser.firstName} ${newUser.lastName}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                };

                return createNotification(notification);

            });
    });