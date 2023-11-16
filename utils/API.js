import axiosInstance from "./fetcher";

function NgoApi(axios) {
  return {
    getAllNgos: async () => (await axios.get("/open/getAllNgos")).data,
    getAllRequirements: async () =>
      (await axios.get("/open/getAllRequirements")).data,
    getAllDrives: async () => (await axios.get("/open/getAllDrives")).data,
    getAllGallery: async () => (await axios.get("/open/getAllGallery")).data,
    getAllSiteVisits: async () => (await axios.get("/open/siteVisitsGC")).data,
    createSiteVisit: async ({ ip }) =>
      (await axios.post("/open/siteVisitsGC", { ip })).data,
    getNextDrive: async () => (await axios.get("/admin/drivesGC")).data,
    createDrive: async ({
      name,
      teamLeader,
      extraInformation,
      dateFrom,
      dateTo,
    }) =>
      (
        await axios.post("/admin/drivesGC", {
          name,
          teamLeader,
          extraInformation,
          dateFrom,
          dateTo,
        })
      ).data,
    getAllAndPreviousEvents: async () =>
      (await axios.get("/admin/eventsGC")).data,
    createEvent: async ({ name, venue, dateFrom, dateTo }) =>
      (
        await axios.post("/admin/eventsGC", {
          name,
          venue,
          dateFrom,
          dateTo,
        })
      ).data,
    getAllRequirementsA: async () =>
      (await axios.get("/admin/requirementsGC")).data,
    createRequirement: async ({ name }) =>
      (
        await axios.post("/admin/requirementsGC", {
          name,
        })
      ).data,
    getAllMembersA: async () => (await axios.get("/admin/membersGC")).data,
    createMember: async ({ name, contact, email }) =>
      (
        await axios.post("/admin/membersGC", {
          name,
          contact,
          email,
        })
      ).data,
    createGallery: async (formData, progressCallback) => {
      const config = {
        headers: { "content-type": "multipart/form-data" },
        onUploadProgress: progressCallback,
        validateStatus: (status) => true,
      };
      const response = await axios.post("/admin/galleryGC", formData, config);

      return response.data;
    },
    getAllGalleryA: async () => (await axios.get("/admin/galleryGC")).data,
    deleteGalleryA: async ({ id }) =>
      (await axios.delete(`/admin/galleryGC?imageId=${id}`)).data,
    getAllDonationsA: async () => (await axios.get("/admin/donationGC")).data,
    createDonations: async ({
      name,
      contact,
      email,
      donationMethod,
      amount,
      skillType,
      hrsPerDay,
      daysPerWeek,
      date_from,
      date_to,
    }) =>
      (
        await axios.post("/admin/donationGC", {
          name,
          contact,
          email,
          donationMethod,
          amount,
          skillType,
          hrsPerDay,
          daysPerWeek,
          date_from,
          date_to,
        })
      ).data,
    // console.log("CD",data)
    updateNgoPassword: async ({
      currentPassword,
      newPassword,
      confirmNewPassword,
    }) =>
      (
        await axios.post("/admin/updatePasswordNgo", {
          currentPassword,
          newPassword,
          confirmNewPassword,
        })
      ).data,
    updateNgoDetails: async ({ about }) =>
      (
        await axios.post("/admin/updateNgoDetails", {
          about,
        })
      ).data,
    getNgoDetails: async () =>
      (await axios.get("/admin/updateNgoDetails")).data,
    RegisterNgo: async ({ address, email, name, phoneNumber, regNumber }) =>
      (
        await axios.post("/ngo/register", {
          address,
          email,
          name,
          phoneNumber,
          regNumber,
        })
      ).data,
    LoginNgo: async ({ email, password }) =>
      (await axios.post("/auth/login", { email, password })).data,
    generateCreds: async ({ email }) =>
      (await axios.post("/superadmin/generateCreds", { email })).data,
    deleteNgo: async ({ email }) =>
      (await axios.post("/superadmin/deleteNgo", { email })).data,
    getAllNgosSA: async () =>
      (await axios.get("/superadmin/getAllNgosSA")).data,
    getNgoByIdSA: async ({ id }) =>
      (await axios.post("/superadmin/getNgoDetailsByIdSA", { id })).data,
    getAllMembersSA: async () =>
      (await axios.get("/superadmin/getAllMembersSA")).data,
  };
}

export default NgoApi(axiosInstance);
