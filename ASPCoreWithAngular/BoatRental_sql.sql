
select * from tblBoatDetails

--table and procedures used to perform actions ..
Create table tblBoatDetails(      
    boatNumber int IDENTITY(1,1) NOT NULL,      
    boatName varchar(20) ,      
    boatImage varchar(max),      
    hourlyRate decimal(10,2),      
    registerDate Datetime,
	IsAvailable varchar(1)
)

Create table tblBoatDetails_deregister(      
    boatNumber int NOT NULL,      
    boatName varchar(20) ,      
    boatImage varchar(max),      
    hourlyRate decimal(10,2),      
    registerDate Datetime,
	IsAvailable varchar(1)
)

Create table tblCustomerRentalDtl(      
    recordNo int IDENTITY(1,1) NOT NULL,
	boatNumber int NOT NULL,      
    customerName varchar(30) ,      
    rentedDate Datetime,           
    returnedDate Datetime
)


Create procedure spAddBoat      
(        
    @boatName VARCHAR(20),         
    @boatImage varchar(max),        
    @hourlyRate VARCHAR(20),        
    @boatnumber int out        
)        
as         
Begin         
    Insert into tblBoatDetails (boatName, boatImage , hourlyRate  ,registerDate ,IsAvailable)
    Values (@boatName,@boatImage,@hourlyRate, getdate(), 'Y')   
	
	select @boatnumber = Scope_Identity() 

    return @boatnumber 
	
End

Create procedure spGetBoatList      
        
as         
Begin         
    select boatNumber, hourlyRate 
	from  tblBoatDetails 
	where isnull(IsAvailable,'') ='Y'
	order by boatNumber
End

Create procedure spGetReturnBoatList        
as         
Begin         
    select boatNumber, hourlyRate 
	from  tblBoatDetails 
	where isnull(IsAvailable,'Y') ='N'
	order by boatNumber
End


Create procedure spUpdateBoatRecord      
(        
    @boatNumber int,
	@custname varchar(3)
)        
as         
Begin         
    update tblBoatDetails set IsAvailable='N' where @boatNumber = @boatNumber

	insert into tblCustomerRentalDtl(boatNumber ,customerName ,rentedDate)
	values (@boatNumber, @custname , getdate())
	
End


Create procedure spReturnBoat    
(        
    @boatNumber int,
	@price decimal(10,2) out,
	@renttime datetime out  
)        
as         
Begin     

	if exists(select 1 from tblBoatDetails where boatNumber = @boatNumber and isnull(IsAvailable,'') ='Y')
	begin

		select @price =  DATEDIFF(hh, rentedDate, getdate()) * B.hourlyRate, @renttime = A.rentedDate
		from tblCustomerRentalDtl A inner join tblBoatDetails B on A.boatNumber = B.boatNumber
		where A.boatNumber = @boatNumber and A.returnedDate is null

		update tblBoatDetails set IsAvailable='Y' where @boatNumber = @boatNumber

		update tblCustomerRentalDtl set 
		returnedDate = getdate() 
		where boatNumber = @boatNumber and returnedDate is null
	end
	
End

Create procedure spDeregisterBoat    
(        
    @boatNumber int
)        
as         
Begin     

	if exists(select 1 from tblBoatDetails where boatNumber = @boatNumber)
	begin
		
		insert into tblBoatDetails_deregister 
		select * from tblBoatDetails where boatNumber = @boatNumber  

		delete from tblBoatDetails where boatNumber = @boatNumber  
	end
	
End