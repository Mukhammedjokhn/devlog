import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function initFirebaseAdmin() {
    if (!getApps().length) {
        initializeApp({
            credential: cert({
                projectId: "medium-344a2",
                clientEmail:
                    "firebase-adminsdk-fbsvc@medium-344a2.iam.gserviceaccount.com",
                privateKey:
                    "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDN/jNopLANtwB7\ncqDuOztSMUxVPM9nQwQw5nIqElJVKP0xEnGBtLBD6AvpxKXchGKrrCXYaznjmzdV\njzdj2cbMVVal+XKwJTpvhnoa/k8cuAHTjgn/LCMx/4YQuBMGklX06ugMafCJ/rk3\n82xx5sLtKQtSZVeUFmTtYO1BywlBAO0IAlWCa90OHQ3q3oVnRAhCtMy8J5tA7juW\npakq2Abv3fRULmEH/YFa2om4+xXt52Nyx81PnWj2d6rZsCe/bK7Tdg0HpJcJyB/6\n1ui5+WWBmbjJQnyhOGVLUtavr10Pw13byOaD45nE/ait/FwJtJr8WHNX9N1tKsaL\no3LLfq5RAgMBAAECggEAZDDzyD3x83nDHkgOxlDA9aVMv1ioeE08SJyNgrEOoqUh\nITEbTD8aTK0cvkMLeUpaw60jazQcH/xq2Y6jHknaS6BmWKwPgGVbGsuJsH9o80r8\neG1pp1dMdxEVoCQn/NZIQKvQ2djdSgE/DVu0r2HSBZAlFZp9EmYiCONQAuRCR/7P\nWzfHOnR70uz7S9C3tnkzhBfz4F9WCDZKjw252L+pbQ1UQq858dBZhXXNgoYxvX2X\np2WVBanemoH5m6kCKORNImPbVtbVyb2KluUPhQKUpZoQLFhXlHqUWdr1mmS8h7j/\ns4vEzFJbdJkXtIK9KnpbX84i8hsa7919DyHYoTCXkQKBgQD2UtY3c1g7n0HjcfJ7\nEVgei81Uu/M2YR8Y42S1qJ4EIERaLQFiSaUWGQ5ZGRbunPZFqeDVIlrGK6o+0Pgu\n/rvOVBVmIjffXCxIoeyUwUIQrGrvoCFY304J1TUzSSs3si+NComPcjWREug5Y84c\nSnhvFotH/FqbB6ec/pkz9ST9JwKBgQDWFccQ918CKiKoO7mLYtxAmc28vpzgK/EJ\naE4VODMebqiHjYdKveCRX86r+t7BKbDsJP5BnpJ+xxJDi0idFhcUraD7v1b21IyM\nG7iUdfwYufOZJbhZp+CVsxf046+/Xdqv2nB0p60B/XGARU9rjhainMU2aB1Z2w1r\nLSAHG+wTxwKBgQC3yfkB6LNF0T81OHkHMFrCd+dduNrwkSjFxi0HiedVBspZSklF\nD9P4l/tnqVu98CmksusJvBdk04G0WvFDB1gTzBMnYJK1uq1kCEVgfI4RqMQlRSJ8\nkClHFukZ+hcf+HiYUOtwt3OWajgRUhGgdERGBtknffgQwnZiominJttRcwKBgQCx\nKZB07+EFz4yin9oqCQOvyhfBrBPyRyrO2CxVzw4ujvCUTIC7T2p5o0lKdO7F9xRc\nNzjZYLpmg6MPlkHfDRrIl+7ypiL3XGl6wK383a5jX+7Au8BVIWHvQCgBFjKoMKj6\ngdAyGVhIn03AEptorEr7ArUJExvG8kmmec9ZUrgInQKBgQCo8xFxjb2E8APdfHM4\n+/Drrg3a+t1efpHQnlOU0nA5t2sHiL6v10gcXi3Udn0Eh7kIgQ4k9cqi7BJFGYP9\n7YBhWRVqmGaRH095F6pVyujPSZMtvTloECeApK5co8S0u7hKAuky+c8lGEJPwhBF\nT7AvxoWtFwuKoHPGj5RkJuwN2w==\n-----END PRIVATE KEY-----\n"?.replace(
                        /\\n/g,
                        "\n"
                    ),
            }),
        });
    }

    return {
        auth: getAuth(),
        db: getFirestore(),
    };
}

export const { auth, db } = initFirebaseAdmin();
