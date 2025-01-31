"""
This type stub file was generated by pyright.
"""

"""
We perform uniqueness checks explicitly on the serializer class, rather
the using Django's `.full_clean()`.

This gives us better separation of concerns, allows us to use single-step
object creation, and makes it possible to switch between using the implicit
`ModelSerializer` class and an equivalent explicit `Serializer` class.
"""
def qs_exists(queryset): # -> Literal[False]:
    ...

def qs_filter(queryset, **kwargs):
    ...

class UniqueValidator:
    """
    Validator that corresponds to `unique=True` on a model field.

    Should be applied to an individual field on the serializer.
    """
    message = ...
    requires_context = ...
    def __init__(self, queryset, message=..., lookup=...) -> None:
        ...
    
    def filter_queryset(self, value, queryset, field_name):
        """
        Filter the queryset to all instances matching the given attribute.
        """
        ...
    
    def exclude_current_instance(self, queryset, instance):
        """
        If an instance is being updated, then do not include
        that instance itself as a uniqueness conflict.
        """
        ...
    
    def __call__(self, value, serializer_field): # -> None:
        ...
    
    def __repr__(self): # -> str:
        ...
    
    def __eq__(self, other) -> bool:
        ...
    


class UniqueTogetherValidator:
    """
    Validator that corresponds to `unique_together = (...)` on a model class.

    Should be applied to the serializer class, not to an individual field.
    """
    message = ...
    missing_message = ...
    requires_context = ...
    def __init__(self, queryset, fields, message=...) -> None:
        ...
    
    def enforce_required_fields(self, attrs, serializer): # -> None:
        """
        The `UniqueTogetherValidator` always forces an implied 'required'
        state on the fields it applies to.
        """
        ...
    
    def filter_queryset(self, attrs, queryset, serializer):
        """
        Filter the queryset to all instances matching the given attributes.
        """
        ...
    
    def exclude_current_instance(self, attrs, queryset, instance):
        """
        If an instance is being updated, then do not include
        that instance itself as a uniqueness conflict.
        """
        ...
    
    def __call__(self, attrs, serializer): # -> None:
        ...
    
    def __repr__(self): # -> str:
        ...
    
    def __eq__(self, other) -> bool:
        ...
    


class ProhibitSurrogateCharactersValidator:
    message = ...
    code = ...
    def __call__(self, value): # -> None:
        ...
    
    def __eq__(self, other) -> bool:
        ...
    


class BaseUniqueForValidator:
    message = ...
    missing_message = ...
    requires_context = ...
    def __init__(self, queryset, field, date_field, message=...) -> None:
        ...
    
    def enforce_required_fields(self, attrs): # -> None:
        """
        The `UniqueFor<Range>Validator` classes always force an implied
        'required' state on the fields they are applied to.
        """
        ...
    
    def filter_queryset(self, attrs, queryset, field_name, date_field_name):
        ...
    
    def exclude_current_instance(self, attrs, queryset, instance):
        """
        If an instance is being updated, then do not include
        that instance itself as a uniqueness conflict.
        """
        ...
    
    def __call__(self, attrs, serializer): # -> None:
        ...
    
    def __eq__(self, other) -> bool:
        ...
    
    def __repr__(self): # -> str:
        ...
    


class UniqueForDateValidator(BaseUniqueForValidator):
    message = ...
    def filter_queryset(self, attrs, queryset, field_name, date_field_name):
        ...
    


class UniqueForMonthValidator(BaseUniqueForValidator):
    message = ...
    def filter_queryset(self, attrs, queryset, field_name, date_field_name):
        ...
    


class UniqueForYearValidator(BaseUniqueForValidator):
    message = ...
    def filter_queryset(self, attrs, queryset, field_name, date_field_name):
        ...
    


