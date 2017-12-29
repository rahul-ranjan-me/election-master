const eventForm = [
  {
    'id' : 'name',
    'label' : 'Event name',
    'type' : 'text',
    'value': ''
  },
  {
    'id' : 'eventLevel',
    'label' : 'Event level',
    'type' : 'select',
    'options' : [
      {
        value : 'national',
        label : 'National'
      },
      {
        value : 'state',
        label : 'State'
      },
      {
        value : 'zone',
        label : 'Zone'
      },
      {
        value : 'district',
        label : 'District'
      },
      {
        value : 'loksabha',
        label : 'Lok Sabha'
      },
      {
        value : 'vidhansabha',
        label : 'Vidhan Sabha'
      }
    ]
  },
  {
    'id' : 'eventOrganizer',
    'label' : 'Organizer name',
    'type' : 'text',
    'value': ''
  },
  {
    'id' : 'eventVolunteerRequired',
    'label' : 'Number of volunteer',
    'type' : 'text',
    'value': ''
  },
  {
    'id' : 'eventVenue',
    'label' : 'Venue',
    'type' : 'text',
    'value': ''
  },
  {
    'id' : 'eventDate',
    'label' : 'Date',
    'type' : 'date',
    'value': ''
  }
]

export default eventForm