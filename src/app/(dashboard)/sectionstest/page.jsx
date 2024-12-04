'use client'

export default function SectionsTestPage() {
  return (
    <div className="w-full h-full rounded-md py-6 px-4 lg:px-10 lg:py-8 lg:mb-4 flex flex-col gap-6">
      {/* {refresh !== "" && <SuccessToast content={refresh} />} */}
      <h1 className="titleHeader">Sections & Coordinator Management</h1>

      <div className="mt-8 flex justify-between items-center">
        <div className="flex flex-col lg:flex-row lg:gap-6">
          {/* <Searchbar
            label="Faculty name or email"
            searchValue={inputValue}
            setSearchValue={handleSearchChange}
            path="faculties"
          /> */}
          {/* <Filter label="User Role" options={userRoleOptions} name="userRole" />
          <Filter
            label="User Status"
            options={userStatusOptions}
            name="userStatus"
          /> */}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Bulk Delete Button */}
          {records.length > 1 && (
            <BulkDelete
              size={30}
              setModal={setModal}
              setType={setType}
              ids={ids}
            />
          )}

          {/* Add Button */}
          <Add size={16} setModal={setModal} setType={setType} />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <FacultyTable
            records={records}
            message="No records found."
            setModal={setModal}
            setType={setType}
            setId={setUserId}
            setName={setUserName}
            onSelectedIdsChange={setIds}
          />

          {totalRecords > 10 && (
            <Pagination
              rows={rows}
              setRows={setRows}
              page={page}
              setPage={setPage}
              totalPages={totalPages}
            />
          )}
        </>
      )}

      <Modal isOpen={modal}>
        <FacultyForm
          setModal={setModal}
          type={type}
          id={userId}
          setRefresh={setRefresh}
          userName={userName}
          ids={ids}
        />
      </Modal>
    </div>
  );
}
