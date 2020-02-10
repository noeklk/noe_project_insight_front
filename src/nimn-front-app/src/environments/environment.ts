// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  nodejs_api_host: `http://${window.location.hostname}:3000/`,

  nodejs_api_route: {
    user: {
      register: "users/register/",
      login: "users/login/",

      get_a_user_by_id: "users/",
      get_all_users: "users/",

      delete_a_user_by_id: "users/"
    },
    module: {
      get_all_modules: "modules/",

      delete_a_module_by_id: "modules/"
    },
    note: {
      get_all_notes: "notes/",
      get_all_notes_by_student_id: "etudiants/",
      get_notes_average_by_module_id: "modules/",

      delete_a_note_by_id: "notes/"
    },
    session: {
      create_a_session: "sessions/",

      get_a_session_by_id: "sessions/",
      get_all_sessions: "sessions/",

      update_session_by_id: "sessions/",

      delete_a_session_by_id: "sessions/"
    },
    token_check: "token/"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
