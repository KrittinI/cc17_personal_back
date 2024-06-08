const prisma = require("../models/prisma")

const eventService = {}

eventService.createEvent = (data) => prisma.event.create({ data })

eventService.getAllEvent = () => prisma.event.findMany()

eventService.getEventById = (id) => prisma.event.findFirst({
    where: { id }
})

// eventService.getEventByDate = (date) => prisma.event.findFirst({
//     where: { eventDay: date }
// })

eventService.updateEvent = (id, data) => prisma.event.updateMany({
    where: { id },
    data
})

module.exports = eventService;