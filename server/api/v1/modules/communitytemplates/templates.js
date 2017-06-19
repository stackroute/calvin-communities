module.exports = [{
    /* template for the surgeon -- medical community*/
      templateName: 'surgeon',
      purpose: 'medical',
      description: 'This template will provides you the required tools and roles to create a medical community',
      tag: ['medcare', 'doctor'],
    // tools available for the surgeon medical community
      tools: [{
        toolId: 'forum',
        actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
        activityEvents: ['newannouncement', 'like', 'remove'],
      }, {
        toolId: 'WeMedUp',
        actions: ['postmesage', 'read', 'Likemessage'],
        activityEvents: ['newannouncement', 'remove'],
      }, {
        toolId: 'sermo',
        actions: ['postmesage', 'read', 'Likemessage', 'edit'],
        activityEvents: ['like', 'remove'],
      }],
    // role actions for the surgeon medical community
      rolesActions: [{
        role: 'admin',
        toolsActions: [{
          toolId: 'sermo',
          actions: [{ action: 'edit', grant: 'self' },
            { action: 'post', grant: 'post_self' },
          ],
        }, {
          toolId: 'WeMedUp',
          actions: [{ action: 'bookmark', grant: 'self' },
            { action: 'post', grant: 'post_self' },
          ],
        }, {
          toolId: 'forum',
          actions: [{ action: 'edit', grant: 'self' },
            { action: 'post', grant: 'post_self' },
          ],
        }, ],
      }],
    }, {  /* template for the specialists -- medical community*/
      templateName: 'specialists',
      purpose: 'medical',
      description: 'This template will provides you the required tools and roles to create a medical community',
      tag: ['medcare', 'doctor', 'therapy'],
      // tools available for the specialists medical community
      tools: [{
        toolId: 'forum',
        actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
        activityEvents: ['newannouncement', 'like', 'remove'],
      }, {
        toolId: 'WeMedUp',
        actions: ['postmesage', 'read', 'Likemessage'],
        activityEvents: ['newannouncement', 'remove'],
      }, {
        toolId: 'sermo',
        actions: ['postmesage', 'read', 'Likemessage', 'edit'],
        activityEvents: ['like', 'remove'],
      }],
      // role actions for the specialists community
      roleActions: [{
        role: 'member',
        toolsActions: [{
          toolId: 'sermo',
          actions: [{ action: 'edit', grant: 'self' },
            { action: 'post', grant: 'post_self' },
          ],
        }, {
          toolId: 'WeMedUp',
          actions: [{ action: 'bookmark', grant: 'self' },
            { action: 'post', grant: 'post_self' },
          ],
        }, {
          toolId: 'forum',
          actions: [{ action: 'edit', grant: 'self' },
            { action: 'post', grant: 'post_self' },
          ],
        }, ],
      }],
    }, {    /* template for the developer's -- technical community*/
      templateName: 'developer',
      purpose: 'technical',
      description: 'This template will provides you the required tools and roles to create a technical community',
      tags: ['IDE', 'platform'],
      // tools available for the developer's community
      tools: [{
        toolId: 'Stackoverflow',
        actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share'],
        activityEvents: ['newannouncement', 'remove'],
      }, {
        toolId: 'Quora',
        actions: ['postmesage', 'read', 'Likemessage', 'comment', 'share', 'invitation'],
        activityEvents: ['like', 'remove'],
      }, {
        toolId: 'Github',
        actions: ['postmesage', 'read', 'Likemessage', 'edit', 'upload'],
        activityEvents: ['newannouncement', 'like'],
      }],
      // role actions for the developer's community
      roleActions: [{
        role: 'moderator',
        toolsActions: [{
          toolId: 'forum',
          actions: [{ action: 'edit', grant: 'self' },
            { action: 'post', grant: 'post_self' },
          ],
        }, {
          toolId: 'scholastic.com',
          actions: [{ action: 'bookmark', grant: 'self' },
            { action: 'post', grant: 'post_self' },
          ],
        }, {
          toolId: 'theteacherscorner.net',
          actions: [{ action: 'edit', grant: 'self' },
            { action: 'post', grant: 'post_self' },
          ],
        }, ],
      }],
    }, {   /* template for the professor -- teacher's community*/
      templateName: 'professor',
      purpose: 'Teaching',
      description: 'This template will provides you the required tools and roles to create a teachers community',
      tags: ['books', 'board', 'school'],
      // tools available for the teacher's community
      tools: [{
        toolId: 'theteacherscorner.net',
        actions: ['postmesage', 'read', 'Likemessage'],
        activityEvents: ['newannouncement', 'like', 'remove'],
      }, {
        toolId: 'scholastic.com',
        actions: ['postmesage', 'read', 'Likemessage', 'edit'],
        activityEvents: ['newannouncement', 'remove'],
      }],
      // role actions for the professor community
      roleActions: [{
        role: 'member',
        toolsActions: [{
          toolId: 'forum',
          actions: [{ action: 'edit', grant: 'self' },
            { action: 'post', grant: 'post_self' },
          ],
        }, {
          toolId: 'scholastic.com',
          actions: [{ action: 'bookmark', grant: 'self' },
            { action: 'post', grant: 'post_self' },
          ],
        }, {
          toolId: 'theteacherscorner.net',
          actions: [{ action: 'edit', grant: 'self' },
            { action: 'post', grant: 'post_self' },
          ],
        }, ],
      }],
    }, {   /* template for the artist -- arts community*/
      templateName: 'artist',
      purpose: 'arts',
      description: 'This template will provides you the required tools and roles to create arts community',
      tags: ['sketches', 'paper', 'paint'],
      // tools available for the artist's community
      tools: [{
        toolId: 'theabundantartist.com',
        actions: ['postmesage', 'read', 'Likemessage'],
        activityEvents: ['newannouncement', 'like', 'remove'],
      }, {
        toolId: 'www.creativebloq.com',
        actions: ['postmesage', 'read', 'Likemessage', 'edit', 'share', 'upload'],
        activityEvents: ['newannouncement', 'remove'],
      }],
      // role actions for the artist community
      rolesActions: [{
        role: 'admin',
        toolsActions: [{
          toolId: 'forum',
          actions: [{ action: 'edit', grant: 'self' },
            { action: 'post', grant: 'post_self' },
          ],
        }, {
          toolId: 'calender',
          actions: [{ action: 'bookmark', grant: 'self' },
            { action: 'add_event', grant: 'self' },
          ],
        }, {
          toolId: 'chat',
          actions: [{ action: 'edit', grant: 'self' },
            { action: 'post', grant: 'post_self' },
          ],
        }, ],
      }],
    }]
